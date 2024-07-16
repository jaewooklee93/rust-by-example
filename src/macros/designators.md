## 디자인레이터

맥로의 인수는 달러 기호 `$` 로 시작되고
*디자인레이터*로 유형이 지정됩니다.

```rust,editable
macro_rules! create_function {
    // 이 맥로는 `ident` 디자인레이터를 사용하여 인수를 받고
    // `$func_name`이라는 이름의 함수를 생성합니다.
    // `ident` 디자인레이터는 변수/함수 이름에 사용됩니다.
    ($func_name:ident) => {
        fn $func_name() {
            // `stringify!` 맥로는 `ident`를 문자열로 변환합니다.
            println!("You called {:?}()",
                     stringify!($func_name));
        }
    };
}

// 위 맥로를 사용하여 `foo`와 `bar`라는 이름의 함수를 생성합니다.
create_function!(foo);
create_function!(bar);

macro_rules! print_result {
    // 이 맥로는 `expr` 유형의 표현식을 받고
    // 그 표현식을 문자열로 출력합니다.
    // `expr` 디자인레이터는 표현식에 사용됩니다.
    ($expression:expr) => {
        // `stringify!`는 표현식을 *그대로* 문자열로 변환합니다.
        println!("{:?} = {:?}",
                 stringify!($expression),
                 $expression);
    };
}

fn main() {
    foo();
    bar();

    print_result!(1u32 + 1);

    // 블록도 표현식입니다!
    print_result!({
        let x = 1u32;

        x * x + 2 * x - 1
    });
}
```

다음은 사용 가능한 디자인레이터 일부입니다.

* `block`
* `expr`는 표현식에 사용됩니다
* `ident`는 변수/함수 이름에 사용됩니다
* `item`
* `literal`는 상수에 사용됩니다
* `pat` (*패턴*)
* `path`
* `stmt` (*문*)
* `tt` (*토큰 트리*)
* `ty` (*유형*)
* `vis` (*시각적 자격*)

더 자세한 내용은 [Rust 참조]를 참조하세요.

[Rust 참조]: https://doc.rust-lang.org/reference/macros-by-example.html
