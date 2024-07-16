## `From`과 `Into`

[`From`]과 [`Into`] 트레이트는 본질적으로 연결되어 있으며, 이는 구현의 일부입니다. 유형 A에서 유형 B로 변환할 수 있다면, 유형 B를 유형 A로 변환할 수 있어야 한다는 것이 당연합니다.

## `From`

[`From`] 트레이트는 다른 유형에서 자신을 생성하는 방법을 정의하여 여러 유형 간의 변환을 위한 매우 간단한 메커니즘을 제공합니다. 표준 라이브러리에는 기본형과 일반적인 유형의 변환을 위한 이 트레이트의 여러 구현이 있습니다.

예를 들어, `str`을 `String`으로 쉽게 변환할 수 있습니다.

```rust
let my_str = "hello";
let my_string = String::from(my_str);
```

우리 자신의 유형에 대한 변환을 정의하는 것도 가능합니다.

```rust,editable
use std::convert::From;

#[derive(Debug)]
struct Number {
    value: i32,
}

impl From<i32> for Number {
    fn from(item: i32) -> Self {
        Number { value: item }
    }
}

fn main() {
    let num = Number::from(30);
    println!("My number is {:?}", num);
}
```

## `Into`

[`Into`] 트레이트는 `From` 트레이트의 역입니다. 다른 유형으로 변환하는 방법을 정의합니다.

`into()`를 호출하는 것은 일반적으로 결과 유형을 명시해야 합니다. 컴파일러가 대부분의 경우 이를 결정할 수 없기 때문입니다.

```rust,editable
use std::convert::Into;

#[derive(Debug)]
struct Number {
    value: i32,
}

impl Into<Number> for i32 {
    fn into(self) -> Number {
        Number { value: self }
    }
}

fn main() {
    let int = 5;
    // 타입 어노테이션을 제거해보세요
    let num: Number = int.into();
    println!("My number is {:?}", num);
}
```

## `From`과 `Into`는 교체 가능합니다

`From`과 `Into`는 보완적인 역할을 합니다. 두 트레이트 모두 구현할 필요가 없습니다. 유형에 대해 `From` 트레이트를 구현하면 `Into` 트레이트가 필요할 때 호출됩니다. 그러나 반대는 사실이 아닙니다. 유형에 대해 `Into` 트레이트를 구현하면 `From` 트레이트의 구현이 자동으로 제공되지 않습니다.

```rust,editable
use std::convert::From;

#[derive(Debug)]
struct Number {
    value: i32,
}

// `From`를 정의
impl From<i32> for Number {
    fn from(item: i32) -> Self {
        Number { value: item }
    }
}

fn main() {
    let int = 5;
    // `Into`를 사용
    let num: Number = int.into();
    println!("My number is {:?}", num);
}
```

[`From`]: https://doc.rust-lang.org/std/convert/trait.From.html
[`Into`]: https://doc.rust-lang.org/std/convert/trait.Into.html
