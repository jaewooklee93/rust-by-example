## 열거형

`enum` 키워드를 사용하면 몇 가지 다른 변형 중 하나일 수 있는 유형을 만들 수 있습니다.
`struct`로 유효한 모든 변형은 `enum`에서도 유효합니다.

```rust,editable
// 웹 이벤트를 분류하는 `enum`을 만듭니다. `PageLoad != PageUnload`와 `KeyPress(char) != Paste(String)`와 같이 이름과 유형 정보가 함께 사용되어 변형을 명확히 구분합니다.
// 각 변형은 서로 독립적입니다.
enum WebEvent {
    // `enum` 변형은 `unit-like`,
    PageLoad,
    PageUnload,
    // tuple struct와 같이,
    KeyPress(char),
    Paste(String),
    // 또는 C 스타일 구조와 같이 할 수 있습니다.
    Click { x: i64, y: i64 },
}

// `WebEvent` 열거형을 인자로 받고 아무것도 반환하지 않는 함수입니다.
fn inspect(event: WebEvent) {
    match event {
        WebEvent::PageLoad => println!("page loaded"),
        WebEvent::PageUnload => println!("page unloaded"),
        // `c`를 `enum` 변형 내부에서 해체합니다.
        WebEvent::KeyPress(c) => println!("pressed '{}'.", c),
        WebEvent::Paste(s) => println!("pasted \"{}\".", s),
        // `Click`를 `x`와 `y`로 해체합니다.
        WebEvent::Click { x, y } => {
            println!("clicked at x={}, y={}.", x, y);
        },
    }
}

fn main() {
    let pressed = WebEvent::KeyPress('x');
    // `to_owned()`은 문자열 슬라이스에서 소유된 `String`을 만듭니다.
    let pasted  = WebEvent::Paste("my text".to_owned());
    let click   = WebEvent::Click { x: 20, y: 80 };
    let load    = WebEvent::PageLoad;
    let unload  = WebEvent::PageUnload;

    inspect(pressed);
    inspect(pasted);
    inspect(click);
    inspect(load);
    inspect(unload);
}

```

## 유형 별칭

유형 별칭을 사용하면 각 열거형 변형을 별칭을 통해 참조할 수 있습니다. 이는 열거형의 이름이 너무 길거나 너무 일반적이고, 이름을 바꾸고 싶을 때 유용합니다.

```rust,editable
enum VeryVerboseEnumOfThingsToDoWithNumbers {
    Add,
    Subtract,
}

// 유형 별칭을 만듭니다.
type Operations = VeryVerboseEnumOfThingsToDoWithNumbers;

fn main() {
    // 각 변형을 별칭을 통해 참조할 수 있습니다.
    let x = Operations::Add;
}
```

가장 일반적으로 볼 수 있는 곳은 `impl` 블록에서 `Self` 별칭을 사용하는 것입니다.

```rust,editable
enum VeryVerboseEnumOfThingsToDoWithNumbers {
    Add,
    Subtract,
}

impl VeryVerboseEnumOfThingsToDoWithNumbers {
    fn run(&self, x: i32, y: i32) -> i32 {
        match self {
            Self::Add => x + y,
            Self::Subtract => x - y,
        }
    }
}
```

열거형과 유형 별칭에 대해 더 자세히 알고 싶으시면 [stabilization report][aliasreport]를 참조하십시오. 이 보고서는 이 기능이 Rust로 안정화되었을 때 작성되었습니다.

### 참조

[`match`][match], [`fn`][fn], and [`String`][str], ["Type alias enum variants" RFC][type_alias_rfc]

[c_struct]: https://en.wikipedia.org/wiki/Struct_(C_programming_language)
[match]: ../flow_control/match.md
[fn]: ../fn.md
[str]: ../std/str.md
[aliasreport]: https://github.com/rust-lang/rust/pull/61682/#issuecomment-502472847
[type_alias_rfc]: https://rust-lang.github.io/rfcs/2338-type-alias-enum-variants.html
