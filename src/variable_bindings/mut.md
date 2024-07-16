## 변경 가능성

변수 바인딩은 기본적으로 변경 불가능하지만, `mut` 수정자를 사용하여 이를 무시할 수 있습니다.

```rust,editable,ignore,mdbook-runnable
fn main() {
    let _immutable_binding = 1;
    let mut mutable_binding = 1;

    println!("변경 전: {}", mutable_binding);

    // 괜찮습니다
    mutable_binding += 1;

    println!("변경 후: {}", mutable_binding);

    // 오류! 변경 가능하지 않은 변수에 새로운 값을 할당할 수 없습니다
    _immutable_binding += 1;
}
```

컴파일러는 변경 가능성 오류에 대한 자세한 진단을 표시합니다.
