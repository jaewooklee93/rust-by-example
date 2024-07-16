## 유형 익명성

클로저는 외부 범위의 변수를 간결하게 캡처합니다. 이것이 어떤 결과를 가져올까요? 분명히 그렇습니다. 클로저를 함수 매개변수로 사용하는 방법을 살펴보세요. [제네릭]이 필요합니다. 이는 클로저가 정의되는 방식 때문입니다.

```rust
// `F`는 제네릭이어야 합니다.
fn apply<F>(f: F) where
    F: FnOnce() {
    f();
}
```

클로저가 정의될 때 컴파일러는 캡처된 변수를 저장하는 새로운 익명 구조를 암시적으로 생성하고 동시에 `traits` 중 하나인 `Fn`, `FnMut` 또는 `FnOnce`를 통해 기능을 구현합니다. 이 유형은 저장된 변수에 할당됩니다.

이 새로운 유형은 알 수 없는 유형이므로 함수에서 사용될 때는 제네릭이 필요합니다. 그러나 무제한적인 유형 매개변수 `<T>`는 여전히 모호하며 허용되지 않습니다. 따라서 `traits` 중 하나인 `Fn`, `FnMut` 또는 `FnOnce` (이것이 구현하는 것)로 경계를 설정하면 유형을 명시하는 데 충분합니다.

```rust,editable
// `F`는 입력이 없고 아무것도 반환하지 않는 클로저를 구현해야 합니다.
// `print`에 필요한 것과 정확히 일치합니다.
fn apply<F>(f: F) where
    F: Fn() {
    f();
}

fn main() {
    let x = 7;

    // `x`를 익명 유형에 캡처하고 `Fn`을 구현합니다.
    let print = || println!("{}", x);

    apply(print);
}
```

### 참조:

[심층 분석][thorough_analysis], [`Fn`][fn], [`FnMut`][fn_mut], 및 [`FnOnce`][fn_once]

[제네릭]: ../../generics.md
[fn]: https://doc.rust-lang.org/std/ops/trait.Fn.html
[fn_mut]: https://doc.rust-lang.org/std/ops/trait.FnMut.html
[fn_once]: https://doc.rust-lang.org/std/ops/trait.FnOnce.html
[thorough_analysis]: https://huonw.github.io/blog/2015/05/finding-closure-in-rust/
