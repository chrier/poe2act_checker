import type { IssueItem } from '../types'

export const issueItems: IssueItem[] = [
  {
    id: 'youtube-poe2-integrated-build-planner',
    issueNumber: 1,
    category: '게임 시스템',
    issueTab: '공식',
    title: 'POE2 클라이언트 내장 빌드 가이드·빌드 플래너 기능 공개',
    quote:
      '“그래서 게임에 빌드 가이드를 통합하기로 했습니다.”',
    summary:
      'Path of Exile 공식 영상에서 POE2에 통합되는 빌드 가이드 기능을 소개했습니다. 빌드 제작자는 .build 파일로 가이드를 내보낼 수 있고, 플레이어는 해당 파일을 문서 폴더의 POE2 빌드 디렉터리에 넣어 클라이언트 안에서 확인할 수 있습니다. 빌드 선택 시 패시브 스킬 트리, 전직 선택, 스킬 젬, 추천 보조 젬, 장비 슬롯별 고유 아이템 또는 아이템 조건, 장단점과 대안 메모까지 확인할 수 있어 커뮤니티 빌드를 따라가는 경험을 게임 안으로 끌어오는 기능입니다.',
    summaryMarkdown:
      '## 빌드 가이드 파일 흐름\n' +
      '- 빌드 제작자는 새로운 .build 파일 형식으로 빌드 가이드를 내보낼 수 있습니다.\n' +
      '- 플레이어는 .build 파일을 다운로드해 문서 폴더의 Path of Exile 2 빌드 디렉터리에 넣으면 됩니다.\n' +
      '- 이후 클라이언트 안에서 해당 빌드를 선택하고 필요한 정보를 확인하는 방식입니다.\n' +
      '## 클라이언트에서 확인 가능한 정보\n' +
      '- 전체 패시브 스킬 트리와 전직 선택을 빌드 가이드 기준으로 확인할 수 있습니다.\n' +
      '- 장착해야 할 스킬 젬과 추천 보조 젬도 함께 표시됩니다.\n' +
      '- 장비 슬롯별 필수 고유 아이템이나 필요한 아이템 조건 설명까지 포함할 수 있습니다.\n' +
      '## 커뮤니티 빌드 활용 포인트\n' +
      '- 드롭다운으로 여러 제작자의 빌드 가이드를 빠르게 전환하며 비교할 수 있습니다.\n' +
      '- 제작자가 장단점, 대안, 요소 간 상호작용 메모를 남길 수 있어 단순 트리 복사보다 설명력이 높습니다.\n' +
      '- 커뮤니티 빌드를 따라가는 경험을 외부 사이트가 아니라 게임 클라이언트 안으로 가져오는 변화입니다.',
    sourceName: 'Path of Exile YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=W0UcprSk8V8',
    sourceType: 'youtube',
    videoEmbedUrl: 'https://www.youtube.com/embed/W0UcprSk8V8',
    status: '확인 필요',
    tags: ['빌드 플래너', '빌드 가이드', '.build', '패시브 트리', '전직', '스킬 젬', '커뮤니티 빌드'],
  },
  {
    id: 'dcinside-poe-unofficial-launcher-release',
    issueNumber: 2,
    category: '커뮤니티 도구',
    issueTab: '도구',
    title: 'PoE & PoE2 Unofficial Launcher 릴리즈',
    quote:
      '“기존에 개발했던 두개의 툴을 통합했어.”',
    summary:
      '디시인사이드 패스 오브 엑자일 2 갤러리 글은 카카오 POE/POE2 실행 절차와 패치 오류 대응을 돕는 PoE & PoE2 Unofficial Launcher 릴리즈를 안내합니다. 주요 기능은 Transferred a partial file 오류 자동 수정, PathOfExile_KG.exe 실행 오류 대응, 카카오게임즈 팝업을 생략한 게임 바로 실행, 카카오/GGG 실행과 오류 수정 지원입니다. 글은 GitHub 다운로드와 릴리즈 노트, 알려진 이슈, 백신 오탐지 가능성과 오픈소스/자동 배포로 신뢰성을 설명하는 FAQ도 함께 제공합니다.',
    summaryMarkdown:
      '## 런처의 핵심 기능\n' +
      '- 기존 카카오 업데이트 오류 자동 수정 도구와 빠른 실행 플러그인을 통합한 비공식 런처입니다.\n' +
      '- Transferred a partial file 오류가 발생하면 자동으로 수정하고 게임 실행까지 이어가도록 돕습니다.\n' +
      '- 카카오게임즈 홈페이지 실행 시 뜨는 여러 팝업을 생략하고 POE/POE2 게임 시작으로 바로 진입하는 기능을 제공합니다.\n' +
      '## 오류 대응과 실행 지원\n' +
      '- PathOfExile_KG.exe 실행 실패 시 런처 좌상단의 실행 파일 강제 복구 기능으로 대응할 수 있다고 안내합니다.\n' +
      '- 카카오게임즈와 GGG 양쪽의 게임 실행 및 오류 수정 흐름을 모두 지원한다고 설명합니다.\n' +
      '- Mac은 작성자 테스트 환경이 없어 미지원이며, Windows 환경 중심 도구로 정리됩니다.\n' +
      '## 설치/주의사항\n' +
      '- GitHub 릴리즈에서 POE2-Unofficial-Launcher-Setup-{version}.exe를 내려받는 방식입니다.\n' +
      '- 초기 버전이라 잦은 패치와 알려진 문제 수정이 있을 수 있으며, 릴리즈 노트와 이슈 트래커 확인이 필요합니다.\n' +
      '- 인증서 부재로 백신 오탐지가 날 수 있어, 소스코드 공개와 자동 배포 구성을 근거로 신뢰성을 설명합니다.',
    sourceName: '디시인사이드 패스 오브 엑자일 2 갤러리',
    sourceUrl: 'https://gall.dcinside.com/mgallery/board/view?id=poe2&no=328622',
    sourceType: 'article',
    status: '확인 필요',
    publishedAt: '2026-01-30',
    tags: ['커뮤니티 도구', '비공식 런처', '카카오게임즈', '패치 오류', 'GitHub', '오픈소스', 'Windows'],
  },
  {
    id: 'youtube-reworked-uniques-reverie-hollow-mask',
    issueNumber: 3,
    category: '고유 아이템',
    issueTab: '공식',
    title: '몽상과 텅 빈 가면, 야생림 테마 재작업 고유 아이템 공개',
    quote:
      '“친구들과 함께 플레이할 때는 두 개를 다 사용해도 좋을 겁니다. 함께 사용하면 강력한 연계로 아군들을 지원할 수 있거든요.”',
    summary:
      'Path of Exile 공식 영상에서 고대의 귀환에 등장하는 재작업 고유 아이템 몽상과 텅 빈 가면을 소개했습니다. 몽상은 생명력 플라스크 회복을 지속적으로 적용하고, 재생의 의례 인장으로 방어력과 재생을 올리는 영역을 만드는 지원형 방어구입니다. 텅 빈 가면은 고대의 꽃을 통해 생명력/마나 플라스크와 호신부 충전을 얻고, 잔류물 효과를 아군에게도 공유해 파티 지원 성격을 강화합니다.',
    summaryMarkdown:
      '## 몽상 — 생명력 플라스크/재생 지원\n' +
      '- 장착 중에는 생명력 플라스크를 직접 쓰지 않아도 회복 효과가 지속적으로 적용됩니다.\n' +
      '- 재생의 의례 인장을 사용하면 영역 안의 아군에게 방어력과 생명력 재생 보너스를 제공합니다.\n' +
      '- 영역 안에서 마나를 소모할수록 방어력/재생 보너스가 커지는 지원형 방어구로 정리됩니다.\n' +
      '## 텅 빈 가면 — 고대의 꽃과 충전 공급\n' +
      '- 착용 중에는 비리디의 선물이 고대의 꽃 형태로 보이며, 야생림 도깨비불의 여러 형상으로 등장합니다.\n' +
      '- 꽃을 주우면 생명력 플라스크, 마나 플라스크, 호신부 충전을 얻을 수 있습니다.\n' +
      '- 잔류물 효과가 자신뿐 아니라 아군에게도 적용되어 파티 플레이 지원 가치가 큽니다.\n' +
      '## 두 아이템의 조합 포인트\n' +
      '- 둘 다 야생림/비리디 테마의 재작업 고유 아이템이며 고대의 귀환에서 획득할 수 있습니다.\n' +
      '- 함께 사용하면 회복, 재생, 방어력, 플라스크/호신부 충전 공급을 묶어 아군을 보조하는 구성이 됩니다.',
    sourceName: 'Path of Exile YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=1MHQmQXcbTE',
    sourceType: 'youtube',
    videoEmbedUrl: 'https://www.youtube.com/embed/1MHQmQXcbTE',
    status: '확인 필요',
    tags: ['고대의 귀환', '몽상', '텅 빈 가면', '고유 아이템', '재작업', '플라스크', '파티 지원'],
  },
  {
    id: 'youtube-spirit-walker-ascendancy-showcase',
    issueNumber: 4,
    category: '전직 클래스',
    issueTab: '공식',
    title: '헌트리스 전직 Spirit Walker 쇼케이스',
    quote:
      '“이 전직 클래스는 혼백의 세 가지 위상을 중심에 두고 있습니다. 혈기, 원시, 야생이죠.”',
    summary:
      'Path of Exile 공식 영상에서 고대의 귀환에 추가되는 헌트리스 전직 Spirit Walker를 상세 소개했습니다. 핵심은 수사슴을 활용하는 혈기 경로, 올빼미 깃털로 투사체를 강화하는 원시 경로, 곰 반려수를 부르는 야생 경로입니다. 세 위상을 모두 강화하는 신성한 합일, 소환수 빌드용 우상 숭배, 보스까지 길들일 수 있는 자연의 질서가 주요 포인트로 소개됩니다. 후반부에서는 돌개바람과 투사체를 결합한 폭풍인도자 빌드, 반려수 제한을 크게 완화하는 숲의 제웅을 활용한 동물원 사육사 빌드 예시도 보여줍니다.',
    summaryMarkdown:
      '## Spirit Walker 핵심 구조\n' +
      '- 헌트리스 신규 전직으로, 혈기·원시·야생 세 가지 혼백 위상을 중심으로 설계됩니다.\n' +
      '- 혈기는 수사슴 쇄도와 감전 지대, 원시는 올빼미 깃털을 통한 투사체 강화, 야생은 곰 반려수와 방어 지원에 초점이 있습니다.\n' +
      '- 신성한 합일은 세 위상을 동시에 강화해 각 동물 혼백의 기능과 외형을 확장하는 핵심 노드입니다.\n' +
      '## 빌드 예시와 활용 포인트\n' +
      '- 폭풍인도자는 돌개바람과 투사체 강화를 결합해 화면을 넓게 덮는 공격형 예시입니다.\n' +
      '- 동물원 사육사는 반려수 제한 완화와 여러 동물/소환수를 활용하는 소환수형 예시입니다.\n' +
      '- 자연의 질서로 보스를 길들일 수 있다는 점과 우상 숭배의 소환수 보너스가 빌드 다양성의 핵심입니다.',
    sourceName: 'Path of Exile YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=86MS6GHBAOg',
    sourceType: 'youtube',
    videoEmbedUrl: 'https://www.youtube.com/embed/86MS6GHBAOg',
    status: '확인 필요',
    tags: ['Spirit Walker', '헌트리스', '전직 클래스', '고대의 귀환', '반려수', '투사체', '빌드 예시'],
  },
  {
    id: 'youtube-dusk-salvation-grenade-launchers',
    issueNumber: 5,
    category: '고유 아이템',
    issueTab: '공식',
    title: '해질녘과 구원, 신규 방패·유탄 발사기 고유 아이템 공개',
    quote:
      '“솔직히 이건 석궁이라고 할 수도 없습니다. 사실 이 고유 아이템을 위해 완전히 새로운 기본 유형을 만들었습니다.”',
    summary:
      'Path of Exile 공식 영상에서 고대의 귀환에 추가되는 엔드게임 고유 아이템 해질녘과 구원을 소개했습니다. 해질녘은 균열 군주 툴의 방패로, 방패를 던진 뒤 다시 사용하면 방패 위치로 순간이동해 지면을 강타하는 방식의 플레이를 제공합니다. 구원은 일반 탄약 스킬 대신 다양한 유탄을 활용하는 트라탄 계열 무기로, 충분히 전투를 이어가면 유탄 스킬의 재사용 대기시간을 무시하고 발사 속도를 크게 높이는 폭발 중심 플레이를 지원합니다. 영상은 구원이 사실상 유탄 발사기용 새로운 기본 유형을 여는 아이템이라고 설명합니다.',
    summaryMarkdown:
      '## 해질녘 — 툴 테마 방패\n' +
      '- 균열 군주 툴의 방패로, 방패를 멀리 던진 뒤 재사용하면 방패 위치로 순간이동해 지면을 강타합니다.\n' +
      '- 방패가 돌아오거나 얼음 결정을 파괴하면 재사용 대기시간이 초기화되어, 전투 중 연속 이동·강타 리듬을 만들 수 있습니다.\n' +
      '- 핵심은 단순 방어구가 아니라, 위치 이동과 광역 강타를 묶은 엔드게임 고유 방패라는 점입니다.\n' +
      '## 구원 — 유탄 발사기 중심 무기\n' +
      '- 일반 탄약 스킬을 쓰는 석궁이 아니라, 다양한 유탄을 운용하도록 설계된 트라탄 계열 고유 무기입니다.\n' +
      '- 전투를 이어가며 조건을 채우면 유탄 스킬의 일반 재사용 대기시간을 무시하고 발사 속도를 크게 끌어올릴 수 있습니다.\n' +
      '- 영상에서는 구원이 유탄 중심 속성 풀과 함께 사실상 “유탄 발사기” 기본 유형을 여는 아이템이라고 설명합니다.',
    sourceName: 'Path of Exile YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=jsp5NFH5714',
    sourceType: 'youtube',
    videoEmbedUrl: 'https://www.youtube.com/embed/jsp5NFH5714',
    status: '확인 필요',
    tags: ['고대의 귀환', '해질녘', '구원', '고유 아이템', '유탄 발사기', '방패', '엔드게임'],
  },
  {
    id: 'youtube-chris-wilson-jonathan-rogers-poe2-interview',
    issueNumber: 6,
    category: '개발 인터뷰',
    issueTab: '이슈',
    title: 'Chris Wilson과 Jonathan Rogers의 POE2 개발·1.0 일정 인터뷰',
    quote:
      '“0.5.0이 마지막 릴리스가 될 것이고, 또 다른 리그를 만들면 1.0이 더 뒤로 밀리기 때문에 이제 게임을 끝내는 쪽으로 가야 했습니다.”',
    summary:
      'Chris Wilson이 Jonathan Rogers와 POE2 개발 상황을 인터뷰한 영상입니다. Jonathan은 0.5.0이 거대한 엔드게임 개선 패치가 된 이유, 0.4.0에서 밀린 작업이 0.5.0에 합쳐진 배경, Early Access가 원래 예상보다 길어지면서 라이브 서비스와 베타 테스트를 동시에 운영해야 했던 어려움을 설명합니다. 특히 0.5.0 이후 별도 0.6.0 없이 1.0 완성에 집중하려는 이유로, 새 리그를 한 번 더 만들면 캠페인 Act 5·6과 정식 출시 준비가 더 늦어지기 때문이라고 말합니다. 후반부에서는 고정 출시일과 스코프 조절, 빠른 출시 cadence, 리그 시뮬레이터/프로토타이핑, ExileCon 준비, POE2의 접근성 방향과 신규 유저 진입점에 대한 생각도 다룹니다.',
    summaryMarkdown:
      '## 0.5.0 이후 개발 방향\n' +
      '- 0.5.0은 0.4.0에서 밀린 작업까지 합쳐진 큰 엔드게임 개선 패치로 설명됩니다.\n' +
      '- 이후 별도 0.6.0 리그를 만들기보다 1.0 완성에 집중하려는 방향이 강조됩니다.\n' +
      '- 새 리그를 한 번 더 만들면 캠페인 Act 5·6과 정식 출시 준비가 더 늦어지는 것이 핵심 이유입니다.\n' +
      '## 라이브 서비스와 출시 운영\n' +
      '- Early Access가 길어지면서 라이브 서비스와 베타 테스트를 동시에 운영해야 하는 부담을 다룹니다.\n' +
      '- 고정 출시일, 스코프 조절, 빠른 패치 cadence가 중요한 운영 과제로 언급됩니다.\n' +
      '- 리그 시뮬레이터/프로토타이핑, ExileCon 준비, 신규 유저 접근성도 후반부 주요 화제입니다.',
    sourceName: 'Chris Wilson YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=M0PhEFcIkg4',
    sourceType: 'youtube',
    videoEmbedUrl: 'https://www.youtube.com/embed/M0PhEFcIkg4',
    status: '확인 필요',
    tags: ['Chris Wilson', 'Jonathan Rogers', '0.5.0', '1.0', 'Early Access', '엔드게임', '개발 인터뷰'],
  },
  {
    id: 'dcinside-paid-build-guide-debate',
    issueNumber: 7,
    category: '커뮤니티 논쟁',
    issueTab: '이슈',
    title: 'POE2 유료 멤버십 빌드 가이드 공개 논쟁 정리',
    quote:
      '“빌드 가이드를 만드는 건 영상 제작과 같아서 시간이 꽤 걸리고, Paywall 뒤에 두는 게 본질적으로 잘못되었다고 생각하지 않는다.”',
    summary:
      '디시인사이드 패스 오브 엑자일 갤러리 글은 Fubgun 방송에서 다뤄진 Jungroan, Guythatdies 간의 POE2 빌드 가이드 유료 멤버십 공개 논쟁을 긴 대화 형식으로 정리합니다. 핵심 쟁점은 빌드 가이드와 선공개 영상을 유료 멤버십 뒤에 두는 것이 커뮤니티의 빌드 공유·반복 개선 문화와 충돌하는지, 그리고 크리에이터가 생활비와 채널 운영을 위해 어느 정도 유료화를 선택할 수 있는지입니다. 글 후반부에서는 Fubgun이 유료화가 단기 수익은 줄 수 있어도 장기적으로 채널 성장과 커뮤니티 접근성을 해칠 수 있다고 평가하며, 전업 스트리밍 전에는 직장·알바 등 백업 플랜을 유지하는 편이 현실적이라고 조언합니다.',
    summaryMarkdown:
      '## 논쟁의 핵심 쟁점\n' +
      '- Jungroan, Guythatdies, Fubgun 방송 맥락에서 나온 POE2 빌드 가이드 유료 멤버십 공개 논쟁입니다.\n' +
      '- 빌드 가이드와 선공개 영상을 paywall 뒤에 두는 것이 커뮤니티의 공유·반복 개선 문화와 충돌하는지가 핵심입니다.\n' +
      '- 반대로 크리에이터가 생활비와 채널 운영을 위해 어느 정도 유료화를 선택할 수 있는지도 함께 다뤄집니다.\n' +
      '## 커뮤니티/채널 운영 관점\n' +
      '- Fubgun은 유료화가 단기 수익은 줄 수 있어도 장기적으로 채널 성장과 접근성을 해칠 수 있다고 봅니다.\n' +
      '- 빌드 정보는 공개 후 커뮤니티가 실험하고 개선하면서 가치가 커진다는 관점이 강조됩니다.\n' +
      '- 전업 스트리밍 전에는 직장·알바 같은 백업 플랜을 유지하는 편이 현실적이라는 조언도 포함됩니다.',
    sourceName: '디시인사이드 패스 오브 엑자일 갤러리',
    sourceUrl: 'https://gall.dcinside.com/pathofexile/1211306',
    sourceType: 'article',
    status: '확인 필요',
    publishedAt: '2026-05-18',
    tags: ['커뮤니티', '빌드 가이드', '유료 멤버십', '크리에이터', 'Fubgun', 'Jungroan', 'Guythatdies'],
  },
  {
    id: 'youtube-auspex-facebreaker-unique-items',
    issueNumber: 8,
    category: '고유 아이템',
    issueTab: '공식',
    title: 'The Auspex와 Facebreaker, 고대의 귀환 신규 고유 아이템 공개',
    quote:
      '“이 장갑을 장착하고 손이 비어 있으면 주먹만으로 모든 철퇴 스킬을 사용할 수 있습니다.”',
    summary:
      'Path of Exile 공식 영상에서 Return of the Ancients에 추가될 신규 고유 아이템 The Auspex와 Facebreaker를 소개했습니다. The Auspex는 연무의 큰까마귀 소환수, 광기 폭발, 격분 충전, 감속 디버프 강화, 낮은 생명력 상태 피격 피해 행운 효과를 중심으로 한 아이템입니다. Facebreaker는 손이 비어 있을 때 주먹으로 철퇴 스킬을 사용할 수 있게 하고, 캠페인에서 치아를 모아 보스를 추적하며 처치할수록 물리 피해를 얻는 격투형 고유 장갑으로 소개됩니다.',
    summaryMarkdown:
      '## The Auspex — 큰까마귀/디버프 중심\n' +
      '- 연무의 큰까마귀 소환수와 광기 폭발을 중심으로 한 신규 고유 아이템입니다.\n' +
      '- 격분 충전, 감속 디버프 강화, 낮은 생명력 상태 피격 피해 행운 효과가 주요 키워드입니다.\n' +
      '- 핵심은 소환수와 디버프, 조건부 생존/피해 완화를 엮는 빌드 가능성입니다.\n' +
      '## Facebreaker — 맨손 철퇴 스킬 장갑\n' +
      '- 손이 비어 있으면 주먹만으로 철퇴 스킬을 사용할 수 있게 하는 격투형 고유 장갑입니다.\n' +
      '- 캠페인에서 치아를 모아 보스를 추적하고, 처치할수록 물리 피해를 얻는 성장형 구조가 소개됩니다.\n' +
      '- 초반 무기 선택이나 맨손/물리 기반 빌드 메타에 영향을 줄 수 있는 아이템으로 정리됩니다.',
    sourceName: 'Path of Exile YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=e2QZNDtJhoM',
    sourceType: 'youtube',
    videoEmbedUrl: 'https://www.youtube.com/embed/e2QZNDtJhoM',
    status: '확인 필요',
    myNote:
      'Act 체크리스트보다는 별도 이슈/메타 참고 항목에 가깝습니다. 5월 30일 출시 예정인 고대의 귀환 콘텐츠와 초반 빌드/무기 선택 팁에 영향이 있는지 나중에 확인하면 좋겠습니다.',
    tags: ['Return of the Ancients', 'The Auspex', 'Facebreaker', '고유 아이템', '빌드 메타'],
  },
  {
    id: 'dcinside-mageblood-aldur-warrior-charm-mod',
    issueNumber: 9,
    category: '잡똥글',
    issueTab: '잡똥글',
    title: '디바인 소모 마피 옵션 아직도 모르겠어??',
    quote: '“장착된 호신부 (2-4)개가 알두르의 10293번째 전사에 의해 보호됨 이거임”',
    summary:
      'DCInside 패스 오브 엑자일 갤러리의 짧은 정보성/잡담 글입니다. 마피 관련 옵션으로 보이는 문구를 “장착된 호신부 (2-4)개가 알두르의 10293번째 전사에 의해 보호됨”이라고 특정해 공유한 내용입니다.',
    summaryMarkdown:
      '## 핵심 내용\n' +
      '- 글쓴이는 디바인 소모 마피 옵션으로 보이는 문구를 짧게 공유했습니다.\n' +
      '- 확인 대상 문구는 “장착된 호신부 (2-4)개가 알두르의 10293번째 전사에 의해 보호됨”입니다.\n' +
      '- 상세 검증 글이라기보다는 옵션 확인용 짧은 커뮤니티 메모로 분류합니다.',
    sourceName: 'DCInside 패스 오브 엑자일 마이너 갤러리',
    sourceUrl: 'https://gall.dcinside.com/pathofexile/1211190',
    sourceType: 'article',
    status: '확인 필요',
    publishedAt: '2026-05-18 11:16:33',
    tags: ['마피', '호신부', '디바인', '옵션', '커뮤니티 잡글'],
  },
  {
    id: 'issue-page-guide',
    issueNumber: 999,
    category: '운영 메모',
    issueTab: '이슈',
    title: 'POE2 이슈 탭 사용 방식',
    quote: '외부 글은 전문 복사 대신 핵심 문장만 짧게 인용하고, 요약과 원문 링크를 함께 둡니다.',
    summary:
      '패치, 빌드 메타, 액트 동선, 보상 누락 같은 체크리스트 반영 후보를 모아두는 별도 페이지입니다. 이후 Maxroll, 공식 포럼, 커뮤니티 글을 수동으로 정리해 추가하면 됩니다.',
    sourceName: '직접 작성',
    sourceUrl: 'https://github.com/chrier/poe2act_checker',
    status: '확인 필요',
    myNote: '실제 외부 글을 추가할 때는 제목, 짧은 인용, 요약, 출처 링크만 넣고 전문 복사는 피하기.',
    tags: ['운영', '큐레이션', '출처 링크'],
    hidden: true,
  },
]
