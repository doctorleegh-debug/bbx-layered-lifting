# 퍼스널 레이어드 리프팅 — 아임웹 코드위젯 초안

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
