## `?`

`match`를 사용하여 결과를 연결하는 것은 꽤 깔끔하지 않을 수 있습니다. 다행히 `?` 연산자를 사용하면 다시 깔끔하게 만들 수 있습니다. `?`는 `Result`를 반환하는 표현식의 끝에 사용되며, `Err(err)` 항이 `return Err(From::from(err))`로 확장되고 `Ok(ok)` 항이 `ok` 표현식으로 확장되는 `match` 표현식과 동일합니다.

```rust,editable,ignore,mdbook-runnable
mod checked {
    #[derive(Debug)]
    enum MathError {
        DivisionByZero,
        NonPositiveLogarithm,
        NegativeSquareRoot,
    }

    type MathResult = Result<f64, MathError>;

    fn div(x: f64, y: f64) -> MathResult {
        if y == 0.0 {
            Err(MathError::DivisionByZero)
        } else {
            Ok(x / y)
        }
    }

    fn sqrt(x: f64) -> MathResult {
        if x < 0.0 {
            Err(MathError::NegativeSquareRoot)
        } else {
            Ok(x.sqrt())
        }
    }

    fn ln(x: f64) -> MathResult {
        if x <= 0.0 {
            Err(MathError::NonPositiveLogarithm)
        } else {
            Ok(x.ln())
        }
    }

    // 중간 함수
    fn op_(x: f64, y: f64) -> MathResult {
        // `div`가 "실패"하면 `DivisionByZero`가 `return`될 것입니다
        let ratio = div(x, y)?;

        // `ln`이 "실패"하면 `NonPositiveLogarithm`이 `return`될 것입니다
        let ln = ln(ratio)?;

        sqrt(ln)
    }

    pub fn op(x: f64, y: f64) {
        match op_(x, y) {
            Err(why) => panic!("{}", match why {
                MathError::NonPositiveLogarithm
                    => "로그의 비음수",
                MathError::DivisionByZero
                    => "0으로 나누기",
                MathError::NegativeSquareRoot
                    => "음수의 제곱근",
            }),
            Ok(value) => println!("{}", value),
        }
    }
}

fn main() {
    checked::op(1.0, 10.0);
}
```

[documentation][docs]를 확인하십시오. `Result`를 매핑/조합하는 방법은 많습니다.

[docs]: https://doc.rust-lang.org/std/result/index.html
