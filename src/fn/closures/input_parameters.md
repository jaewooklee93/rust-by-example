## 입력 매개변수로서

Rust는 변수를 캡처하는 방법을 주로 타입 어노테이션 없이 자동으로 선택하지만, 함수를 작성할 때는 이러한 모호성이 허용되지 않습니다. 폐쇄를 입력 매개변수로 받을 때, 폐쇄의 완전한 유형은 `traits` 중 하나를 사용하여 지정해야 하며, 이는 폐쇄가 캡처된 값을 사용하는 방식에 따라 결정됩니다. 제한의 순서대로 나열하면 다음과 같습니다.

* `Fn`: 폐쇄가 참조 (`&T`)를 사용하여 캡처된 값을 사용합니다.
* `FnMut`: 폐쇄가 변경 가능한 참조 (`&mut T`)를 사용하여 캡처된 값을 사용합니다.
* `FnOnce`: 폐쇄가 값 (`T`)을 사용하여 캡처된 값을 사용합니다.

변수별로, 컴파일러는 폐쇄에서 사용되는 캡처 변수에 따라 최소 제한적인 방식으로 변수를 캡처합니다.

예를 들어, `FnOnce`로 표시된 매개변수를 고려해 보겠습니다. 이는 폐쇄가 `&T`, `&mut T` 또는 `T`로 캡처할 수 있음을 의미하지만, 컴파일러는 캡처된 변수가 폐쇄에서 어떻게 사용되는지에 따라 최종적으로 선택합니다.

왜냐하면 이동이 가능하면 모든 유형의 대여도 가능해야 하기 때문입니다. 반대로, 매개변수가 `Fn`으로 표시된 경우 `&mut T` 또는 `T`로 변수를 캡처하는 것은 허용되지 않습니다. 그러나 `&T`는 허용됩니다.

다음 예제에서 `Fn`, `FnMut` 및 `FnOnce`의 사용을 교체하여 어떤 일이 일어나는지 확인해 보세요.

```rust,editable
// 폐쇄를 인수로 받는 함수 및 호출합니다.
// <F>는 "Generic type parameter"를 나타냅니다.
fn apply<F>(f: F) where
    // 폐쇄는 입력을 받지 않고 아무것도 반환하지 않습니다.
    F: FnOnce() {
    // ^ TODO: 이를 `Fn` 또는 `FnMut`로 변경해 보세요.

    f();
}

// 폐쇄를 인수로 받고 `i32`를 반환하는 함수.
fn apply_to_3<F>(f: F) -> i32 where
    // 폐쇄는 `i32`를 입력받고 `i32`를 반환합니다.
    F: Fn(i32) -> i32 {

    f(3)
}

fn main() {
    use std::mem;

    let greeting = "hello";
    // 비복사 유형.
    // `to_owned`은 대여된 데이터에서 소유된 데이터를 생성합니다
    let mut farewell = "goodbye".to_owned();

    // 2개의 변수를 캡처합니다: `greeting`은 참조로, `farewell`은 값으로.
    let diary = || {
        // `greeting`은 참조로 캡처되어 `Fn`이 필요합니다.
        println!("I said {}.", greeting);

        // 변경은 `farewell`를 변경 가능한 참조로 캡처하도록 강요합니다. 이제 `FnMut`가 필요합니다.
        farewell.push_str("!!!");
        println!("Then I screamed {}.", farewell);
        println!("Now I can sleep. zzzzz");

        // 수동으로 `drop`을 호출하면 `farewell`가 값으로 캡처되도록 강요합니다. 이제 `FnOnce`가 필요합니다.
        mem::drop(farewell);
    };

    // 폐쇄를 적용하는 함수를 호출합니다.
    apply(diary);

    // `double`은 `apply_to_3`의 trait bound를 충족합니다
    let double = |x| 2 * x;

    println!("3 doubled: {}", apply_to_3(double));
}
```

### 참조:

[`std::mem::drop`][drop], [`Fn`][fn], [`FnMut`][fnmut], [Generics][generics], [where][where] 및 [`FnOnce`][fnonce]

[drop]: https://doc.rust-lang.org/std/mem/fn.drop.html
[fn]: https://doc.rust-lang.org/std/ops/trait.Fn.html
[fnmut]: https://doc.rust-lang.org/std/ops/trait.FnMut.html
[fnonce]: https://doc.rust-lang.org/std/ops/trait.FnOnce.html
[generics]: ../../generics.md
[where]: ../../generics/where.md
