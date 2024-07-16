## 디버그

`std::fmt` 형식화 `trait`를 사용하려는 모든 유형은 인쇄 가능하도록 구현해야 합니다.
`std` 라이브러리와 같은 유형에 대해서는 자동으로 구현됩니다. 나머지는 수동으로 구현해야 합니다.

`fmt::Debug` `trait`는 이를 매우 간단하게 만듭니다. 모든 유형이 `derive` (자동으로 생성) `fmt::Debug` 구현을 할 수 있습니다. 이는 `fmt::Display`에 대해서는 `derive`를 사용할 수 없다는 점과 다릅니다. `fmt::Display`는 수동으로 구현해야 합니다.

```rust
// 이 구조는 `fmt::Display` 또는 `fmt::Debug`로 인쇄할 수 없습니다.
struct UnPrintable(i32);

// `derive` 속성은 이 구조가 `fmt::Debug`로 인쇄 가능하도록 자동으로 구현합니다.
#[derive(Debug)]
struct DebugPrintable(i32);
```

모든 `std` 라이브러리 유형은 `{:?}`로 자동으로 인쇄 가능합니다.

```rust,editable
// `Structure`에 대한 `fmt::Debug` 구현을 `derive`합니다. `Structure`는 하나의 `i32`를 포함하는 구조입니다.
#[derive(Debug)]
struct Structure(i32);

// `Structure`를 `Deep` 구조 안에 넣습니다. 이것도 인쇄 가능하도록 합니다.
#[derive(Debug)]
struct Deep(Structure);

fn main() {
    // `{:?}`로 인쇄하는 것은 `{}`와 유사합니다.
    println!("{:?} 개월이 있습니다.", 12);
    println!("{1:?} {0:?}는 {actor:?}입니다.",
             "Slater",
             "Christian",
             actor="actor's");

    // `Structure`가 인쇄 가능합니다!
    println!("지금 {:?}가 인쇄됩니다!", Structure(3));

    // `derive`의 문제점은 결과의 모양을 제어할 수 없다는 것입니다. 만약 이것이 단순히 `7`만 보여주도록 하고 싶다면 어떻게 해야 할까요?
    println!("지금 {:?}가 인쇄됩니다!", Deep(Structure(7)));
}
```

따라서 `fmt::Debug`는 분명히 인쇄 가능하도록 만듭니다. 하지만 몇 가지 우아함을 희생합니다. Rust는 `{:#?}`로 "예쁘게 인쇄"하는 기능도 제공합니다.

```rust,editable
#[derive(Debug)]
struct Person<'a> {
    name: &'a str,
    age: u8
}

fn main() {
    let name = "Peter";
    let age = 27;
    let peter = Person { name, age };

    // 예쁘게 인쇄
    println!("{:#?}", peter);
}
```

`fmt::Display`를 수동으로 구현하여 표시 방식을 제어할 수 있습니다.

### 참조

[`attributes`][attributes], [`derive`][derive], [`std::fmt`][fmt], 및 [`struct`][structs]

[attributes]: https://doc.rust-lang.org/reference/attributes.html
[derive]: ../../trait/derive.md
[fmt]: https://doc.rust-lang.org/std/fmt/
[structs]: ../../custom_types/structs.md

