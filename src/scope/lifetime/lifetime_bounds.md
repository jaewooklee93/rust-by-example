## 경계

일반적인 유형과 마찬가지로, 라이프타임(자체적으로 일반적)도 경계를 사용합니다.
`:` 기호는 여기서 약간 다른 의미를 가지지만, `+`는 동일합니다. 다음과 같은 방식으로 읽는 방법을 알아보세요.

1. `T: 'a`: `T` 안의 모든 참조가 라이프타임 `'a`보다 오래 살아야 합니다.
2. `T: Trait + 'a`: 유형 `T`는 트레이트 `Trait`를 구현해야 하며, `T` 안의 모든 참조가 라이프타임 `'a`보다 오래 살아야 합니다.

다음 예제는 `where` 키워드 뒤에 사용되는 위 문법을 보여줍니다.

```rust,editable
use std::fmt::Debug; // 경계로 사용할 트레이트.

#[derive(Debug)]
struct Ref<'a, T: 'a>(&'a T);
// `Ref`는 `'a`라는 알 수 없는 라이프타임을 가진 일반적인 유형 `T`에 대한 참조를 포함합니다. `T`는 모든 *참조*가 `'a`보다 오래 살아야 하는 경계를 가지고 있습니다. 또한, `Ref`의 라이프타임은 `'a`를 초과할 수 없습니다.

// `Debug` 트레이트를 사용하여 출력하는 일반적인 함수.
fn print<T>(t: T) where
    T: Debug {
    println!("`print`: t is {:?}", t);
}

// 여기서 `T`는 `Debug`를 구현하며 모든 *참조*가 `'a`보다 오래 살아야 하는 `'a`에 대한 참조가 취해집니다. 또한, `'a`는 함수보다 오래 살아야 합니다.
fn print_ref<'a, T>(t: &'a T) where
    T: Debug + 'a {
    println!("`print_ref`: t is {:?}", t);
}

fn main() {
    let x = 7;
    let ref_x = Ref(&x);

    print_ref(&ref_x);
    print(ref_x);
}
```

### 참조:

[generics][generics], [generics에서의 경계][bounds], and 
[generics에서의 여러 경계][multibounds]

[generics]: ../../generics.md
[bounds]: ../../generics/bounds.md
[multibounds]: ../../generics/multi_bounds.md
