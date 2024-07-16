## if/else

`if`-`else`를 사용한 분기 처리 방식은 다른 언어와 유사합니다. 다만, 불린 조건을 괄호로 둘러싸는 것이 필요하지 않으며, 각 조건은 블록으로 이어집니다. `if`-`else` 조건문은 표현식이며, 모든 분기에서 동일한 유형을 반환해야 합니다.

```rust,editable
fn main() {
    let n = 5;

    if n < 0 {
        print!("{} is negative", n);
    } else if n > 0 {
        print!("{} is positive", n);
    } else {
        print!("{} is zero", n);
    }

    let big_n =
        if n < 10 && n > -10 {
            println!(", and is a small number, increase ten-fold");

            // 이 표현식은 `i32`를 반환합니다.
            10 * n
        } else {
            println!(", and is a big number, halve the number");

            // 이 표현식 또한 `i32`를 반환해야 합니다.
            n / 2
            // TODO ^ 세미콜론으로 이 표현식을 억제해 보세요.
        };
    //   ^ 세미콜론을 잊지 마세요! 모든 `let` 바인딩은 세미콜론이 필요합니다.

    println!("{} -> {}", n, big_n);
}
```
