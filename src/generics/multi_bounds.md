## 여러 제약 조건

한 유형에 대해 여러 제약 조건을 `+`를 사용하여 적용할 수 있습니다. 일반적으로 다른 유형은 `，`로 구분됩니다.

```rust,editable
use std::fmt::{Debug, Display};

fn compare_prints<T: Debug + Display>(t: &T) {
    println!("Debug: `{:?}`", t);
    println!("Display: `{}`", t);
}

fn compare_types<T: Debug, U: Debug>(t: &T, u: &U) {
    println!("t: `{:?}`", t);
    println!("u: `{:?}`", u);
}

fn main() {
    let string = "words";
    let array = [1, 2, 3];
    let vec = vec![1, 2, 3];

    compare_prints(&string);
    //compare_prints(&array);
    // TODO ^ 이 부분을 주석 해제해 보세요.

    compare_types(&array, &vec);
}
```

### 참조:

[`std::fmt`][fmt] 및 [`trait`s][traits]

[fmt]: ../hello/print.md
[traits]: ../trait.md
