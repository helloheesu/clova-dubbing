# 클로바 더빙 MVP 클론

## 기능 구현 순서

1. 타임라인 이동 및 재생
   - 고정폭 (20초)
1. 음원박스 추가 및 재생
   - 추가시 단순 차례로 쌓이는 방식
   - 타임라인이 해당 위치로 가면 음원이 재생됨
1. 음원박스 이동
   - 드래그해서 이동
   - 시간끝에 닿거나 음원이 겹치면 경고

## 타임라인 이동 및 재생

UI 구성 요소

- 전체 컨테이너 (Timeline)
  - 드래그등으로 뷰포트 내 이동 가능해야함
- 시간 표시바 (ProgressBar)
- 현재 위치 표시 (CurrentPositionIndicator)
  - 선(::after)
  - 시간(TimeDisplay)
- (추가기능) 마우스 위치 표시 (HoverPositionIndicator)
