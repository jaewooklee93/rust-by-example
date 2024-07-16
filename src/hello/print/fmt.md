## 형식

우리는 형식이 *형식 문자열*을 통해 지정된다는 것을 알았습니다:

* `format!("{}", foo)` -> `"3735928559"`
* `format!("0x{:X}", foo)` -> [`"0xDEADBEEF"`][deadbeef]
* `format!("0o{:o}", foo)` -> `"0o33653337357"`

같은 변수 (`foo`)는 사용된 *인수 유형*에 따라 다르게 형식화될 수 있습니다: `X` vs `o` vs *미지정*.

이 형식화 기능은 trait를 통해 구현되며, 각 인수 유형에는 하나의 trait가 있습니다. 가장 일반적인 형식화 trait는 `Display`로, 인수 유형이 미지정인 경우 (예: `{}`)를 처리합니다.

```rust,editable
use std::fmt::{self, Formatter, Display};

struct City {
    name: &'static str,
    // 위도
    lat: f32,
    // 경도
    lon: f32,
}

impl Display for City {
    // `f`는 버퍼이며, 이 메서드는 형식화된 문자열을 버퍼에 씁니다.
    fn fmt(&self, f: &mut Formatter) -> fmt::Result {
        let lat_c = if self.lat >= 0.0 { 'N' } else { 'S' };
        let lon_c = if self.lon >= 0.0 { 'E' } else { 'W' };

        // `write!`는 `format!`와 유사하지만, 형식화된 문자열을 버퍼(첫 번째 인수)에 씁니다.
        write!(f, "{}: {:.3}°{} {:.3}°{}",
               self.name, self.lat.abs(), lat_c, self.lon.abs(), lon_c)
    }
}

#[derive(Debug)]
struct Color {
    red: u8,
    green: u8,
    blue: u8,
}

fn main() {
    for city in [
        City { name: "Dublin", lat: 53.347778, lon: -6.259722 },
        City { name: "Oslo", lat: 59.95, lon: 10.75 },
        City { name: "Vancouver", lat: 49.25, lon: -123.1 },
    ] {
        println!("{}", city);
    }
    for color in [
        Color { red: 128, green: 255, blue: 90 },
        Color { red: 0, green: 3, blue: 254 },
        Color { red: 0, green: 0, blue: 0 },
    ] {
        // 이를 `{}`로 변경하려면 `fmt::Display` trait에 대한 구현을 추가해야 합니다.
        println!("{:?}", color);
    }
}
```

`std::fmt` 문서에서 [형식화 trait 목록][fmt_traits]과 그 인수 유형을 볼 수 있습니다.

### 활동

위의 `Color` 구조체에 대한 `fmt::Display` trait의 구현을 추가하여 출력이 다음과 같이 표시되도록 하세요:

```text
RGB (128, 255, 90) 0x80FF5A
RGB (0, 3, 254) 0x0003FE
RGB (0, 0, 0) 0x000000
```

막막해질 경우 세 가지 힌트입니다:

* RGB 색상 공간에서 색상을 계산하는 공식은 다음과 같습니다:
`RGB = (R*65536)+(G*256)+B , (R이 RED, G가 GREEN, B가 BLUE일 때)`.
더 자세한 내용은 [RGB 색상 형식 및 계산][rgb_color]을 참조하세요.
* [버퍼에 문자열을 여러 번 추가해야 할 수 있습니다][named_parameters].
* `:0>2`를 사용하여 [두 자리까지 0으로 채우기][fmt_width]할 수 있습니다.

### 참조

[`std::fmt`][fmt]

[rgb_color]: https://www.rapidtables.com/web/color/RGB_Color.html#rgb-format
[named_parameters]: https://doc.rust-lang.org/std/fmt/#named-parameters
[deadbeef]: https://en.wikipedia.org/wiki/Deadbeef#Magic_debug_values
[fmt]: https://doc.rust-lang.org/std/fmt/
fmt_traits: https://doc.rust-lang.org/std/fmt/#formatting-traits
fmt_width: https://doc.rust-lang.org/std/fmt/#width
