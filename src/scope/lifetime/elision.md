## 생략

일부 라이프타임 패턴은 너무나 흔하기 때문에, 빌로우 체커는 입력을 줄이고 읽기 쉽도록 생략하도록 허용합니다. 이것이 라이프타임 생략이라고 합니다. 라이프타임 생략은 Rust에서 이러한 패턴이 흔하기 때문에 존재합니다.

다음 코드는 생략의 몇 가지 예를 보여줍니다. 라이프타임 생략에 대한 자세한 설명은 [라이프타임 생략][elision]을 참조하세요.

```rust,editable
// `elided_input`과 `annotated_input`은 라이프타임이 컴파일러에 의해 추론되기 때문에 본질적으로 동일한 서명을 가지고 있습니다.
fn elided_input(x: &i32) {
    println!("`elided_input`: {}", x);
}

fn annotated_input<'a>(x: &'a i32) {
    println!("`annotated_input`: {}", x);
}

// 마찬가지로 `elided_pass`와 `annotated_pass`는 라이프타임이 `elided_pass`에 암시적으로 추가되기 때문에 동일한 서명을 가지고 있습니다.
fn elided_pass(x: &i32) -> &i32 { x }

fn annotated_pass<'a>(x: &'a i32) -> &'a i32 { x }

fn main() {
    let x = 3;

    elided_input(&x);
    annotated_input(&x);

    println!("`elided_pass`: {}", elided_pass(&x));
    println!("`annotated_pass`: {}", annotated_pass(&x));
}
```

### 참조:

[elision][elision]

[elision]: https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html#lifetime-elision
