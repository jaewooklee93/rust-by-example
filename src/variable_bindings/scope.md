## 범위 및 그림자 생성

변수 바인딩은 범위를 가지며, 괄호 `{}`로 둘러싸인 *블록* 안에서만 유효합니다. 블록은 중괄호로 묶인 여러 문장입니다.
```rust,editable,ignore,mdbook-runnable
fn main() {
    // 이 바인딩은 main 함수에서 유효합니다
    let long_lived_binding = 1;

    // 이것은 블록이며, main 함수보다 작은 범위를 가지고 있습니다
    {
        // 이 바인딩은 이 블록 안에서만 유효합니다
        let short_lived_binding = 2;

        println!("inner short: {}", short_lived_binding);
    }
    // 블록의 끝

    // 오류! `short_lived_binding`은 이 범위에서 존재하지 않습니다
    println!("outer short: {}", short_lived_binding);
    // FIXME ^ 이 줄을 주석 처리하세요

    println!("outer long: {}", long_lived_binding);
}
```
또한, [변수 그림자 생성][variable-shadow]이 허용됩니다.
```rust,editable,ignore,mdbook-runnable
fn main() {
    let shadowed_binding = 1;

    {
        println!("before being shadowed: {}", shadowed_binding);

        // 이 바인딩은 외부 바인딩을 *그림자* 덮습니다
        let shadowed_binding = "abc";

        println!("shadowed in inner block: {}", shadowed_binding);
    }
    println!("outside inner block: {}", shadowed_binding);

    // 이 바인딩은 이전 바인딩을 *그림자* 덮습니다
    let shadowed_binding = 2;
    println!("shadowed in outer block: {}", shadowed_binding);
}
```
[variable-shadow]: https://en.wikipedia.org/wiki/Variable_shadowing
