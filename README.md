# 퍼스널 레이어드 리프팅 — 최신 검토본

## 2026년 9월 8일 완료본

- [완료본 미리보기](https://doctorleegh-debug.github.io/bbx-layered-lifting/v3/)
- [위젯별 코드 보기·복사](https://doctorleegh-debug.github.io/bbx-layered-lifting/v3/code.html)

상단 문구 “하나로 끝내지 않습니다.”, 요청한 장비 9종 순서, 배경을 제거한 인물과 모바일 배치, 얼굴·목 9개 부위의 증상 요약 및 선택 안내, 파스텔 핑크 3D 픽토그램 4종, 부위명과 제목 텍스트 모션을 반영했습니다. 장비별 타겟층 표시는 추가하지 않았습니다.

얼굴 안내 하단의 클릭 유도 문구와 중복 상세 설명은 제거했습니다. 부위 이름과 요약을 함께 표시하며, 모바일에서도 요약을 확인할 수 있습니다. 부위·표시점을 선택할 때의 강조 동작은 유지합니다.

아이콘은 정적 이미지입니다. 별도 360도 회전 작업은 취소되어 포함하지 않았습니다. 이 링크는 검토용 GitHub Pages이며 아임웹 운영 페이지 반영과 별개입니다.

---

## 이전 초안 기록

뷰티블라썸의원 하위페이지 리디자인. 검토용 초안입니다.

## 보기

| | 주소 |
|---|---|
| 아임웹 하위페이지 미리보기 | `https://doctorleegh-debug.github.io/bbx-layered-lifting/` |
| 위젯 단독 | `https://doctorleegh-debug.github.io/bbx-layered-lifting/widget.html` |

## 구성

- 히어로 — Three.js 3D 무대 + 원내 실사 배경 디졸브, 장비 9종 회전 등장
- 2번 섹션 — 좌측 시술 실사(9장) 디졸브 + 우측 장비 보드 9개, 곡선 연결
- 이후 — 대상별 / 장비 캐러셀 / 프로그램 / FAQ / 마무리

## 아임웹에 넣을 때

`widget.html` 전체를 코드위젯에 붙여넣습니다.
자산 위치는 파일 첫 줄 한 곳만 바꾸면 됩니다.

```html
<script>window.BBX_ASSET_BASE = 'https://doctorleegh-debug.github.io/bbx-layered-lifting';</script>
```

## 아직 채워지지 않은 소재

- 좌측 시술 실사 9장 중 8장 (`assets/09_scene/`, 세로 3:4, 1200x1600)
- 우측 보드 실사 9장 중 8장 (`assets/10_treat/`, 가로 4:3, 1400x1050)
- 진단 칸 (의도적으로 비워 둠)

세르프(XERF) 1종만 실제 이미지가 들어가 있고 나머지는 자리표시입니다.
