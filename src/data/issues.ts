import type { IssueItem } from '../types'

export const issueItems: IssueItem[] = [
  {
    id: 'youtube-auspex-facebreaker-unique-items',
    category: '고유 아이템',
    title: 'The Auspex와 Facebreaker, 고대의 귀환 신규 고유 아이템 공개',
    quote:
      '“이 장갑을 장착하고 손이 비어 있으면 주먹만으로 모든 철퇴 스킬을 사용할 수 있습니다.”',
    summary:
      'Path of Exile 공식 영상에서 Return of the Ancients에 추가될 신규 고유 아이템 The Auspex와 Facebreaker를 소개했습니다. The Auspex는 연무의 큰까마귀 소환수, 광기 폭발, 격분 충전, 감속 디버프 강화, 낮은 생명력 상태 피격 피해 행운 효과를 중심으로 한 아이템입니다. Facebreaker는 손이 비어 있을 때 주먹으로 철퇴 스킬을 사용할 수 있게 하고, 캠페인에서 치아를 모아 보스를 추적하며 처치할수록 물리 피해를 얻는 격투형 고유 장갑으로 소개됩니다.',
    sourceName: 'Path of Exile YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=e2QZNDtJhoM',
    status: '확인 필요',
    myNote:
      'Act 체크리스트보다는 별도 이슈/메타 참고 항목에 가깝습니다. 5월 30일 출시 예정인 고대의 귀환 콘텐츠와 초반 빌드/무기 선택 팁에 영향이 있는지 나중에 확인하면 좋겠습니다.',
    tags: ['Return of the Ancients', 'The Auspex', 'Facebreaker', '고유 아이템', '빌드 메타'],
  },
  {
    id: 'issue-page-guide',
    category: '운영 메모',
    title: 'POE2 이슈 탭 사용 방식',
    quote: '외부 글은 전문 복사 대신 핵심 문장만 짧게 인용하고, 요약과 원문 링크를 함께 둡니다.',
    summary:
      '패치, 빌드 메타, 액트 동선, 보상 누락 같은 체크리스트 반영 후보를 모아두는 별도 페이지입니다. 이후 Maxroll, 공식 포럼, 커뮤니티 글을 수동으로 정리해 추가하면 됩니다.',
    sourceName: '직접 작성',
    sourceUrl: 'https://github.com/chrier/poe2act_checker',
    status: '확인 필요',
    myNote: '실제 외부 글을 추가할 때는 제목, 짧은 인용, 요약, 출처 링크만 넣고 전문 복사는 피하기.',
    tags: ['운영', '큐레이션', '출처 링크'],
  },
]
