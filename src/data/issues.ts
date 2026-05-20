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
    id: 'arca-fulmination-wrath-sceptre-usage',
    issueNumber: 10,
    category: '커뮤니티 빌드 메모',
    issueTab: '커뮤니티',
    title: 'Ai요약,스압) 노호 달린 진노 셉터 활용도',
    quote: '“풀미네이션 버프를 제공하는 특정 셉터는 적들이 감전되었을 때 광역 피해를 주어 화면을 효과적으로 정리할 수 있는 잠재력이 있다.”',
    summary:
      'Arca 패스 오브 엑자일 2 채널의 커뮤니티 정리글입니다. 원문은 YouTube 영상 내용을 AI 요약한 형태로, 노호가 붙은 진노 셉터/풀미네이션 버프를 감전 기반 광역 정리 도구로 활용하는 방법을 설명합니다. 레벨링과 초반 맵핑에서 강점이 있고, 아크·스파크 같은 연쇄 번개 스킬, 미니언, 전사, 드루이드 등 다양한 빌드 응용 가능성을 다룹니다.',
    summaryMarkdown:
      '## 핵심 요약\n' +
      '- 풀미네이션 셉터는 감전된 적을 처음 공격할 때 주변 감전 적들에게 추가 광역 피해를 퍼뜨리는 방식으로 화면 정리에 도움을 줍니다.\n' +
      '- 기본 피해 감소 페널티가 있지만 스킬 레벨, 오라 위력, 아이템 보정으로 효율을 끌어올릴 수 있다는 내용입니다.\n' +
      '- 특히 피해가 부족한 레벨링·초반 맵핑 구간에서 가치가 높고, 충분히 원샷이 나는 후반에는 대체 셉터가 나을 수 있다고 정리합니다.\n' +
      '## 시너지 후보\n' +
      '- 아크, 스파크, 번개 창처럼 감전과 연쇄/확산이 쉬운 스킬과 잘 맞는다고 설명합니다.\n' +
      '- 궁수·해골 미니언, 도약 강타/뼈 분쇄 전사, 늑대·곰 드루이드도 감전 수단만 확보하면 응용 가능성이 있다고 봅니다.\n' +
      '- 원문에는 참고 YouTube 링크도 포함되어 있어, 실제 작동 방식은 영상과 함께 재확인하는 편이 좋습니다.',
    sourceName: 'Arca 패스 오브 엑자일 2 채널',
    sourceUrl: 'https://arca.live/b/poe2/170920925',
    sourceType: 'article',
    status: '확인 필요',
    publishedAt: '2026-05-17 06:21:04',
    tags: ['풀미네이션', '진노 셉터', '감전', '레벨링', '아크', '스파크', '커뮤니티'],
  },
  {
    id: 'reddit-league-start-be-like',
    issueNumber: 11,
    category: '잡똥글',
    issueTab: '잡똥글',
    title: 'League start be like',
    quote: '“Wait for the patchnotes.. after that everything will be different”',
    summary:
      'Reddit r/PathOfExile2의 리그 스타트 밈 글입니다. 호머가 술집에 앉아 있고 화면 곳곳에 회오리/트위스터처럼 보이는 스킬 이미지가 덮인 밈으로, 패치노트 전부터 특정 리그 스타터·스트리머 빌드가 반복적으로 언급되는 분위기를 놀리는 잡담 글입니다.',
    summaryMarkdown:
      '## 댓글 반응\n' +
      '- 상위 댓글은 패치노트 전에 연습 빌드를 띄우고, GGG가 너프하면 “그래도 아직 사기”라고 말하다가 다시 너프되는 흐름을 농담으로 정리했습니다.\n' +
      '- 다른 반응들은 “패치노트를 기다려야 한다”, “아직 뭐가 너프될지도 모르는데 리그 스타트 연습을 한다”는 식으로 메타 예측을 비꼽니다.\n' +
      '- 일부 댓글은 결국 활 빌드를 할 것이라는 농담이나, 새 Facebreaker/무술 계열을 하겠다는 가벼운 잡담으로 이어집니다.',
    sourceName: 'Reddit r/PathOfExile2',
    sourceUrl: 'https://www.reddit.com/r/PathOfExile2/comments/1th652z/league_start_be_like/',
    sourceType: 'article',
    imageUrl: 'https://i.redd.it/tkicb4j3kz1h1.png',
    status: '확인 필요',
    publishedAt: '2026-05-19 00:07:17 UTC',
    tags: ['Reddit', '리그 스타트', '밈', '트위스터', '패치노트', '댓글 반응', '잡똥글'],
  },
  {
    id: 'pcgamer-return-of-the-ancients-last-major-update-before-1-0',
    issueNumber: 12,
    category: '출시 일정 / 개발 방향',
    issueTab: '이슈',
    title: "PC Gamer: Return of the Ancients는 1.0 전 마지막 대형 업데이트",
    quote: '“I want to get this game finished. I really, really do.”',
    summary:
      'PC Gamer가 Jonathan Rogers 인터뷰를 바탕으로 정리한 POE2 0.5.0/Return of the Ancients 기사입니다. Rogers는 0.5.0이 올해 후반 얼리 액세스 종료와 1.0 출시 전 마지막 본격 확장팩이며, 이후에는 밸런스 업데이트나 미니 리그 정도가 있을 수 있다고 설명했습니다.',
    summaryMarkdown:
      '## 1.0 전 마지막 대형 업데이트\n' +
      '- PC Gamer는 Return of the Ancients, 즉 0.5.0이 올해 후반 POE2가 얼리 액세스를 떠나기 전 마지막 proper expansion이라고 전했습니다.\n' +
      '- Rogers는 정확한 1.0 날짜는 밝히지 않았지만, ExileCon이 열리는 11월 이후 조금 뒤가 될 것이라고 말했습니다.\n' +
      '- 1.0 전까지 밸런스 업데이트나 미니 리그는 가능하지만, 0.5.0급 대형 확장은 없을 전망입니다.\n' +
      '## 1.0에 포함될 내용과 빠질 수 있는 것\n' +
      '- 1.0 업데이트에는 캠페인 마지막 두 액트와 기존 캐릭터 클래스의 모든 전직이 포함될 예정입니다.\n' +
      '- 다만 이전에 발표된 나머지 신규 클래스 5종 중 일부만 1.0에 맞춰 들어갈 수 있고, 검 같은 신규 무기 유형도 모두 들어오지 못할 수 있다고 언급했습니다.\n' +
      '- 개발진은 “게임을 완성하고 싶다”는 방향으로, 정규 리그 개발 리듬으로 돌아가는 것을 목표로 보고 있습니다.\n' +
      '## 엔드게임 개편 의도\n' +
      '- 0.5.0은 캠페인 이후의 엔드게임을 퀘스트와 보스전이 있는 더 안내된 경험으로 재구성하는 업데이트입니다.\n' +
      '- Rogers는 현재 캠페인과 엔드게임이 별개 게임처럼 갈라지는 느낌을 줄이고, 무한 파밍에 관심 없는 플레이어에게도 만족스러운 도착점을 주려 한다고 설명했습니다.\n' +
      '- 기사 기준 Return of the Ancients / 0.5.0 출시일은 2026년 5월 29일로 언급되었습니다.',
    sourceName: 'PC Gamer',
    sourceUrl: 'https://www.pcgamer.com/games/rpg/path-of-exile-2s-massive-return-of-the-ancients-expansion-will-be-its-last-major-update-before-it-leaves-early-access-later-this-year-i-want-to-get-this-game-finished-i-really-really-do/',
    sourceType: 'article',
    status: '확인 필요',
    publishedAt: '2026-05-07 21:30:00 UTC',
    tags: ['PC Gamer', 'Return of the Ancients', '0.5.0', '1.0', '얼리 액세스', 'ExileCon', '엔드게임'],
  },
  {
    id: 'reddit-nerf-tier-list',
    issueNumber: 13,
    category: '커뮤니티 밸런스 예측',
    issueTab: '커뮤니티',
    title: 'Nerf Tier List',
    quote: '“No patch notes so this chart is just a guess.”',
    summary:
      'Reddit r/PathOfExile2의 0.5.0 패치 전 밸런스 너프 예측 밈/티어리스트 글입니다. 이미지에는 FUBAR, FROM ORBIT, THE OL TRIPLE TAP 같은 강한 너프 단계부터 NOT NERFED, BUFFED LMAO까지 나뉘어 CoC Comet, Twisters, Rathpith, self chill, Blood Mage, high armour, CHONK, energy shield, minions 등의 운명을 농담처럼 분류했습니다.',
    summaryMarkdown:
      '## 티어리스트 내용\n' +
      '- 최상단 FUBAR에는 100% reduced duration, gas grenade + incinerate, ES leech가 올라가 있습니다.\n' +
      '- FROM ORBIT에는 CoC Comet, THE OL TRIPLE TAP에는 self chill, Rathpith, Twisters, eternal rage가 배치되어 강한 너프 후보처럼 표현됩니다.\n' +
      '- 반대로 BUFFED LMAO에는 plants, thunderstorm shock, adorned, CHONK, energy shield, offhand sceptres, minions가 들어가 버프/생존 후보처럼 농담됩니다.\n' +
      '## 댓글 반응\n' +
      '- 상위 댓글은 CoC Comet이 “from orbit”보다 낮게 잡힌 것을 의아해하며, 27%의 고성능 빌드가 Comet을 쓴다는 식으로 추가 너프를 예상했습니다.\n' +
      '- Hexblast를 0.1 때처럼 다시 살려달라는 반응, chaos 피해 정체성이 아직 애매하다는 반응도 있었습니다.\n' +
      '- 일부는 아직 패치노트가 없으니 전부 추측이라고 선을 그었고, Chrono/Gemling/Chonk/Armour/ES 같은 항목의 실제 버프·너프 가능성을 두고 잡담이 이어졌습니다.',
    sourceName: 'Reddit r/PathOfExile2',
    sourceUrl: 'https://www.reddit.com/r/PathOfExile2/comments/1thfmlq/nerf_tier_list/',
    sourceType: 'article',
    imageUrl: 'https://redlib.perennialte.ch/preview/external-pre/L9RLhUi8QhcmyHcw8IgCmH0aBwCTIGq2PP-_N4HrPXk.png?auto=webp&s=a540cccc2e02fe5dcb7f8741f7468b2cb4e556c8',
    status: '확인 필요',
    publishedAt: '2026-05-19 07:35:17 UTC',
    tags: ['Reddit', '밸런스', '너프 예측', '티어리스트', 'CoC Comet', 'Twisters', 'CHONK', '댓글 반응', '커뮤니티'],
  },
  {
    id: 'youtube-expedition-exploring-the-ocean',
    issueNumber: 14,
    category: '게임 시스템',
    issueTab: '공식',
    title: '탐험 일지로 아틀라스 남동쪽 해양을 여는 Expedition 개편 공개',
    quote: '“네, 이제 해양을 탐험할 수 있습니다.”',
    summary:
      'Path of Exile 공식 영상에서 알두르의 룬 리그의 Expedition 일지 개편을 소개했습니다. 탐험 인카운터에서 얻은 일지를 바다에서 사용하면 아틀라스 남동쪽 해양의 안개가 걷히고, 새로운 섬과 탐험 인카운터가 드러나는 구조입니다. 각 섬에서는 칼구르인의 유해, 룬 제작 유적, 사이렌 알과 조개, 혈족 야영지, 갇힌 야수와 유배자, 룬석으로 활성화하는 거대한 유물 등 서로 다른 폭파 대상과 보상을 만나며, 일지를 계속 얻어 해양을 더 깊이 탐험할 수 있습니다.',
    summaryMarkdown:
      '## 해양 탐험 흐름\n' +
      '- 알두르의 룬 리그에서는 탐험 인카운터에서 일지를 얻고, 이를 바다에서 사용해 아틀라스 남동쪽 해양을 밝히는 방식으로 바뀝니다.\n' +
      '- 안개가 걷히면 새로운 섬들이 드러나며, 각 섬에는 별도의 탐험 인카운터가 배치됩니다.\n' +
      '- 룬 몬스터를 처치해 일지를 추가로 얻으면 해양을 더 멀리, 원하는 만큼 깊게 탐험할 수 있습니다.\n' +
      '## 섬별 인카운터 예시\n' +
      '- 표백된 모래톱에서는 사이렌 알과 보물이 담긴 조개를 폭파할 수 있고, 알을 많이 파괴하면 사이렌이 직접 나타납니다.\n' +
      '- 바위투성이 반도에서는 혈족 야영지를 폭파해 혈족을 끌어내고, 우리에 갇힌 야수나 유배자를 풀어줄 수 있습니다.\n' +
      '- 내륙 잡목지에서는 작은 룬석을 파괴해 거대한 유물의 슬롯을 활성화하고 모든 조합법을 제작할 수 있습니다.\n' +
      '## 보상/콘텐츠 포인트\n' +
      '- 탐험에는 알두르의 룬 제작 유적이 포함되어 다양한 조합법과 제작 기회를 제공합니다.\n' +
      '- 고대 금고, 신규 보스, 여러 유형의 지하 지역, 갇힌 도깨비불과 뿌리 문 같은 추가 요소도 언급됩니다.\n' +
      '- Act 체크리스트보다는 0.5.0 엔드게임/탐험 시스템 변경 참고 항목에 가깝습니다.',
    sourceName: 'Path of Exile YouTube',
    sourceUrl: 'https://www.youtube.com/watch?v=ZIzyNUTiYCo',
    sourceType: 'youtube',
    videoEmbedUrl: 'https://www.youtube.com/embed/ZIzyNUTiYCo',
    status: '확인 필요',
    tags: ['Expedition', '탐험', '일지', '해양 탐험', '알두르의 룬', '룬 제작', '엔드게임'],
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
