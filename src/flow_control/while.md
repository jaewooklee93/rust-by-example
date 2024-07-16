## while

`while` 키워드는 조건이 참일 때 반복문을 실행하는 데 사용할 수 있습니다.

[FizzBuzz][fizzbuzz]를 `while` 루프를 사용하여 작성해 보겠습니다.

```rust,editable
fn main() {
    // 카운터 변수
    let mut n = 1;

    // `n`이 101보다 작을 때까지 루프
    while n < 101 {
        if n % 15 == 0 {
            println!("fizzbuzz");
        } else if n % 3 == 0 {
            println!("fizz");
        } else if n % 5 == 0 {
            println!("buzz");
        } else {
            println!("{}", n);
        }

        // 카운터 증가
        n += 1;
    }
}
```

[fizzbuzz]: https://ko.wikipedia.org/wiki/FizzBuzz
