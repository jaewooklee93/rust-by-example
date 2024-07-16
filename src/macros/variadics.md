## 다양한 인터페이스

_다양한_ 인터페이스는 임의의 수의 인수를 받습니다. 예를 들어,
`println!`은 형식 문자열에 의해 결정되는 임의의 수의 인수를 받을 수 있습니다.

이전 섹션의 `calculate!` 매크로를 다양한 인터페이스로 확장할 수 있습니다.

```rust,editable
macro_rules! calculate {
    // 하나의 `eval`에 대한 패턴
    (eval $e:expr) => {
        {
            let val: usize = $e; // 타입을 정수로 강제
            println!("{} = {}", stringify!{$e}, val);
        }
    };

    // 여러 `eval`을 재귀적으로 분해
    (eval $e:expr, $(eval $es:expr),+) => {{
        calculate! { eval $e }
        calculate! { $(eval $es),+ }
    }};
}

fn main() {
    calculate! { // 다양한 `calculate!`을 보세요!
        eval 1 + 2,
        eval 3 + 4,
        eval (2 * 3) + 1
    }
}
```

출력:

```txt
1 + 2 = 3
3 + 4 = 7
(2 * 3) + 1 = 7
```
