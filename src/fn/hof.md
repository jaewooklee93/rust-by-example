## 고차원 함수

Rust는 고차원 함수(HOF)를 제공합니다. 이러한 함수는 하나 이상의 함수를 받거나 더 유용한 함수를 생성합니다. HOF는 Rust의 함수형 스타일을 제공합니다.

```rust,editable
fn is_odd(n: u32) -> bool {
    n % 2 == 1
}

fn main() {
    println!("1000 미만의 홀수 제곱의 합을 찾습니다");
    let upper = 1000;

    // 명령형 접근
    // 누적 변수 선언
    let mut acc = 0;
    // 반복: 0, 1, 2, ... 무한
    for n in 0.. {
        // 숫자 제곱
        let n_squared = n * n;

        if n_squared >= upper {
            // 상한선을 초과하면 루프를 종료
            break;
        } else if is_odd(n_squared) {
            // 홀수이면 값을 누적
            acc += n_squared;
        }
    }
    println!("명령형 스타일: {}", acc);

    // 함수형 접근
    let sum_of_squared_odd_numbers: u32 =
        (0..).map(|n| n * n)                             // 모든 자연수 제곱
             .take_while(|&n_squared| n_squared < upper) // 상한선 이하
             .filter(|&n_squared| is_odd(n_squared))     // 홀수인 경우
             .sum();                                     // 합계
    println!("함수형 스타일: {}", sum_of_squared_odd_numbers);
}
```

[Option][option]
과
[Iterator][iter]
은 각각의 HOF를 구현합니다.

[option]: https://doc.rust-lang.org/core/option/enum.Option.html
[iter]: https://doc.rust-lang.org/core/iter/trait.Iterator.html
