## enum

`enum`은 다음과 같이 해체됩니다.

```rust,editable
// `allow`는 왜곡된 코드 경고를 무시하기 위해 필요합니다. 왜냐하면
// 하나의 변이체만 사용되기 때문입니다.
#[allow(dead_code)]
enum Color {
    // 이 3개는 이름만으로 명시됩니다.
    Red,
    Blue,
    Green,
    // 이 또한 `u32` 튜플을 다른 이름과 연결합니다: 색 모델.
    RGB(u32, u32, u32),
    HSV(u32, u32, u32),
    HSL(u32, u32, u32),
    CMY(u32, u32, u32),
    CMYK(u32, u32, u32, u32),
}

fn main() {
    let color = Color::RGB(122, 17, 40);
    // TODO ^ `color`에 다른 변이체를 시도해보세요

    println!("무슨 색일까요?");
    // `enum`은 `match`를 사용하여 해체할 수 있습니다.
    match color {
        Color::Red   => println!("색은 Red입니다!"),
        Color::Blue  => println!("색은 Blue입니다!"),
        Color::Green => println!("색은 Green입니다!"),
        Color::RGB(r, g, b) =>
            println!("빨강: {}, 초록: {}, 파랑: {}!", r, g, b),
        Color::HSV(h, s, v) =>
            println!("색조: {}, 채도: {}, 가치: {}!", h, s, v),
        Color::HSL(h, s, l) =>
            println!("색조: {}, 채도: {}, 명도: {}!", h, s, l),
        Color::CMY(c, m, y) =>
            println!("청록색: {}, 자홍색: {}, 노랑색: {}!", c, m, y),
        Color::CMYK(c, m, y, k) =>
            println!("청록색: {}, 자홍색: {}, 노랑색: {}, 검정색 (키): {}!",
                c, m, y, k),
        // 다른 팔이 필요하지 않습니다. 모든 변이체가 검토되었습니다.
    }
}
```

### 참조:

[`#[allow(...)]`][allow], [색 모델][color_models] 및 [`enum`][enum]

[allow]: ../../../attribute/unused.md
[color_models]: https://ko.wikipedia.org/wiki/색_모델
[enum]: ../../../custom_types/enum.md
