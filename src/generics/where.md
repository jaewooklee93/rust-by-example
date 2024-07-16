## Where 절

제약 조건을 `where` 절을 사용하여 유형의 첫 번째 언급 바로 전에 표현할 수 있습니다. 또한 `where` 절은 유형 매개변수뿐만 아니라 임의의 유형에 대한 제약 조건을 적용할 수 있습니다.

`where` 절이 유용한 몇 가지 경우:

* 일반 유형과 제약 조건을 별도로 지정하는 것이 명확할 때:

```rust,ignore
impl <A: TraitB + TraitC, D: TraitE + TraitF> MyTrait<A, D> for YourType {}

// `where` 절을 사용하여 제약 조건을 표현
impl <A, D> MyTrait<A, D> for YourType where
    A: TraitB + TraitC,
    D: TraitE + TraitF {}
```

* `where` 절을 사용하는 것이 일반적인 문법보다 더 표현력 있을 때.
이 예제의 `impl`은 `where` 절 없이 직접 표현할 수 없습니다.

```rust,editable
use std::fmt::Debug;

trait PrintInOption {
    fn print_in_option(self);
}

// `where` 절이 필요합니다. `T: Debug` 또는 다른 간접적인 접근 방식을 사용해야 하기 때문입니다.
impl<T> PrintInOption for T where
    Option<T>: Debug {
    // 출력되는 것이 `Option<T>`이기 때문에 `Option<T>: Debug`를 제약 조건으로 사용합니다.
    // 그렇지 않으면 잘못된 제약 조건을 사용하게 됩니다.
    fn print_in_option(self) {
        println!("{:?}", Some(self));
    }
}

fn main() {
    let vec = vec![1, 2, 3];

    vec.print_in_option();
}
```

### 참조:

[RFC][where], [`struct`][struct], and [`trait`][trait]

[struct]: ../custom_types/structs.md
[trait]: ../trait.md
[where]: https://github.com/rust-lang/rfcs/blob/master/text/0135-where.md
