## 표시

`fmt::Debug`는 꽤나 긴밀하고 깔끔하지 않아서, 출력 모양을 직접
맞춤 설정하는 것이 유리합니다. 이는 `fmt::Display`를 수동으로 구현하여
`{}` 출력 마커를 사용하는 것입니다. 구현 방법은 다음과 같습니다:

```rust
// `use`를 통해 `fmt` 모듈을 가져와 사용 가능하게 합니다.
use std::fmt;

// `fmt::Display`를 구현할 구조체를 정의합니다. 이는 `i32`를 포함하는
// 튜플 구조체 `Structure`입니다.
struct Structure(i32);

// `{}` 마커를 사용하려면 `fmt::Display` 트레이트를 해당 유형에 대해
// 수동으로 구현해야 합니다.
impl fmt::Display for Structure {
    // 이 트레이트는 정확한 서명을 요구합니다.
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        // `f`라는 출력 스트림에 첫 번째 요소를 엄격하게 작성합니다.
        // `fmt::Result`를 반환하여 작업이 성공했는지 실패했는지 나타냅니다.
        // `write!`는 `println!`와 매우 유사한 문법을 사용합니다.
        write!(f, "{}", self.0)
    }
}
```

`fmt::Display`는 `fmt::Debug`보다 깔끔할 수 있지만, `std` 라이브러리에게는
문제를 야기합니다. 모호한 유형은 어떻게 표시해야 할까요? 예를 들어,
`std` 라이브러리가 모든 `Vec<T>`에 대해 단일 스타일을 구현했다면,
어떤 스타일을 사용해야 할까요? 다음 두 가지 중 하나일까요?

* `Vec<path>`: `/:/etc:/home/username:/bin` (`: `로 분리)
* `Vec<number>`: `1,2,3` (`,`로 분리)

아니요, 모든 유형에 이상적인 스타일은 없으며 `std` 라이브러리는
어떤 스타일을 지정하려고 하지 않습니다. `fmt::Display`는 `Vec<T>` 또는
다른 일반 유형 컨테이너에 대해 구현되지 않았습니다. `fmt::Debug`는
이러한 일반적인 경우에 사용되어야 합니다.

그러나 이것은 문제가 되지 않습니다. `fmt::Display`는 *일반적이지 않은* 새로운
*컨테이너* 유형에 대해 구현할 수 있습니다.

```rust,editable
use std::fmt; // `fmt` 가져오기

// 두 개의 숫자를 저장하는 구조체. `Debug`는 자동으로 생성되므로
// `Display`와의 결과를 비교할 수 있습니다.
#[derive(Debug)]
struct MinMax(i64, i64);

// `MinMax`에 대해 `Display`를 구현합니다.
impl fmt::Display for MinMax {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        // 각 위치 데이터를 참조하기 위해 `self.number`를 사용합니다.
        write!(f, "({}, {})", self.0, self.1)
    }
}

// 이름이 지정된 필드를 가진 구조체를 정의하여 비교할 수 있습니다.
#[derive(Debug)]
struct Point2D {
    x: f64,
    y: f64,
}

// `Point2D`에 대해 `Display`를 구현합니다.
impl fmt::Display for Point2D {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        // `x`와 `y`만 나타내도록 사용자 정의합니다.
        write!(f, "x: {}, y: {}", self.x, self.y)
    }
}

fn main() {
    let minmax = MinMax(0, 14);

    println!("구조체 비교:");
    println!("표시: {}", minmax);
    println!("Debug: {:?}", minmax);

    let big_range =   MinMax(-300, 300);
    let small_range = MinMax(-3, 3);

    println!("큰 범위는 {big}이고 작은 범위는 {small}입니다", 
             small = small_range,
             big = big_range);

    let point = Point2D { x: 3.3, y: 7.2 };

    println!("포인트 비교:");
    println!("표시: {}", point);
    println!("Debug: {:?}", point);

    // 오류. `Debug`와 `Display`가 모두 구현되었지만 `{:b}`는
    // `fmt::Binary`가 구현되어야 합니다. 이것은 작동하지 않습니다.
    // println!("Point2D가 이진법으로 어떻게 보이는지: {:b}?", point);
}
```

따라서 `fmt::Display`는 구현되었지만 `fmt::Binary`는 구현되지 않았기 때문에
사용할 수 없습니다. `std::fmt`에는 많은 `[`traits`][traits]`가 있으며 각각은
its own implementation이 필요합니다. 이는 [`std::fmt`][fmt]에서 자세히 설명되어 있습니다.

### 활동

위 예제의 출력을 확인한 후 `Point2D` 구조체를 참조하여 `Complex` 구조체를 예제에 추가합니다. 동일한 방식으로 출력될 때, 출력은 다음과 같습니다.

```txt
Display: 3.3 + 7.2i
Debug: Complex { real: 3.3, imag: 7.2 }
```

### 참조

[`derive`][derive], [`std::fmt`][fmt], [`macros`][macros], [`struct`][structs],
[`trait`][traits], and [`use`][use]

[derive]: ../../trait/derive.md
[fmt]: https://doc.rust-lang.org/std/fmt/
[macros]: ../../macros.md
[structs]: ../../custom_types/structs.md
[traits]: https://doc.rust-lang.org/std/fmt/#formatting-traits
[use]: ../../mod/use.md
