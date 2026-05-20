import { getOrCreateAnonymousReactionId } from './reactions'
import { SUPABASE_ENABLED, supabase } from './supabaseClient'

const PRESENCE_CHANNEL = 'poe2act-checker-visitors'

export const VISITOR_PRESENCE_ENABLED = SUPABASE_ENABLED

export function subscribeVisitorPresence(onCountChange: (count: number) => void) {
  const client = supabase
  if (!client) return () => undefined

  const channel = client.channel(PRESENCE_CHANNEL, {
    config: {
      presence: {
        key: getOrCreateAnonymousReactionId(),
      },
    },
  })

  const updateCount = () => {
    const presenceState = channel.presenceState()
    const count = Object.values(presenceState).reduce((total, presences) => total + presences.length, 0)
    onCountChange(count)
  }

  channel
    .on('presence', { event: 'sync' }, updateCount)
    .on('presence', { event: 'join' }, updateCount)
    .on('presence', { event: 'leave' }, updateCount)
    .subscribe(async (status) => {
      if (status !== 'SUBSCRIBED') return

      await channel.track({
        online_at: new Date().toISOString(),
        page: 'poe2act_checker',
      })
      updateCount()
    })

  return () => {
    client.removeChannel(channel)
  }
}
