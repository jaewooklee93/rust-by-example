## 특정 영역 언어 (DSLs)

DSL은 Rust 매크로에 삽입된 미니 "언어"입니다. 완전히 유효한 Rust이기 때문에 매크로 시스템이 일반 Rust 구조로 확장되지만, 작은 언어처럼 보입니다. 이를 통해 특정 기능(한계 내에서)에 대한 간결하거나 직관적인 문법을 정의할 수 있습니다.

예를 들어, 작은 계산기 API를 정의하고 싶다고 가정해 보겠습니다. 표현식을 제공하고 콘솔에 출력을 원합니다.

```rust,editable
macro_rules! calculate {
    (eval $e:expr) => {
        {
            let val: usize = $e; // 타입을 무符号 정수로 강제
            println!("{} = {}", stringify!{$e}, val);
        }
    };
}

fn main() {
    calculate! {
        eval 1 + 2 // hehehe `eval`은 _Rust 키워드가 아닙니다_!
    }

    calculate! {
        eval (1 + 2) * (3 / 4)
    }
}
```

출력:

```txt
1 + 2 = 3
(1 + 2) * (3 / 4) = 0
```

이것은 매우 간단한 예제였지만, [`lazy_static`](https://crates.io/crates/lazy_static) 또는 [`clap`](https://crates.io/crates/clap)와 같은 더 복잡한 인터페이스가 개발되었습니다.

또한 매크로의 두 쌍의 중괄호에 주의하십시오. 외부 중괄호는 `macro_rules!`의 문법의 일부이며, `()` 또는 `[]`와 함께 사용됩니다.
