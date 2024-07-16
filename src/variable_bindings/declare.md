## 먼저 선언하기

변수 바인딩을 먼저 선언하고 나중에 초기화하는 것은 가능합니다.
하지만 이 형태는 거의 사용되지 않으며, 초기화되지 않은
변수를 사용하는 것으로 이어질 수 있습니다.

```rust,editable,ignore,mdbook-runnable
fn main() {
    // 변수 바인딩 선언
    let a_binding;

    {
        let x = 2;

        // 바인딩 초기화
        a_binding = x * x;
    }

    println!("a binding: {}", a_binding);

    let another_binding;

    // 오류! 초기화되지 않은 바인딩 사용
    println!("another binding: {}", another_binding);
    // FIXME ^ 이 줄 주석 처리

    another_binding = 1;

    println!("another binding: {}", another_binding);
}
```

컴파일러는 초기화되지 않은 변수 사용을 금지하며, 이는
정의되지 않은 동작으로 이어질 수 있기 때문입니다.
