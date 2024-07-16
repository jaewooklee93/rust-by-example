## 입력 함수

클로저가 인수로 사용될 수 있기 때문에, 함수도 마찬가지로 사용될 수 있는지 궁금해할 수 있습니다. 물론 가능합니다! 함수가 클로저를 매개변수로 받는다면, 해당 클로저의 트레이트 경계를 충족하는 모든 함수를 매개변수로 전달할 수 있습니다.

```rust,editable
// `Fn` 트레이트를 충족하는 일반적인 `F` 인수를 받는 함수 정의
fn call_me<F: Fn()>(f: F) {
    f();
}

// `Fn` 트레이트를 충족하는 래퍼 함수 정의
fn function() {
    println!("I'm a function!");
}

fn main() {
    // `Fn` 트레이트를 충족하는 클로저 정의
    let closure = || println!("I'm a closure!");

    call_me(closure);
    call_me(function);
}
```

추가적으로, `Fn`, `FnMut`, `FnOnce` 트레이트는 클로저가 외부 범위에서 변수를 어떻게 캡처하는지 결정합니다.

### 참조:

[`Fn`][fn], [`FnMut`][fn_mut], [`FnOnce`][fn_once]

[fn]: https://doc.rust-lang.org/std/ops/trait.Fn.html
[fn_mut]: https://doc.rust-lang.org/std/ops/trait.FnMut.html
[fn_once]: https://doc.rust-lang.org/std/ops/trait.FnOnce.html
