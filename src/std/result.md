## `Result`

`Option` enum을 사용하여 함수의 반환 값으로 실패할 수 있는 경우 `None`을 반환하여 실패를 나타낼 수 있다는 것을 알았습니다. 그러나 때로는 작업이 실패한 이유를 명확히 표현하는 것이 중요합니다. 이를 위해 `Result` enum을 사용합니다.

`Result<T, E>` enum은 두 가지 변형을 가지고 있습니다.

* `Ok(value)`는 작업이 성공했음을 나타내며, 작업에서 반환된 `value`를 감싸고 있습니다. (`value`는 `T` 유형입니다)
* `Err(why)`는 작업이 실패했음을 나타내며, `why`를 감싸고 있습니다. (`why`는 `E` 유형입니다) 이는 실패의 원인을 설명합니다.

```rust,editable,ignore,mdbook-runnable
mod checked {
    // 포착하고 싶은 수학적 "오류"
    #[derive(Debug)]
    pub enum MathError {
        DivisionByZero,
        NonPositiveLogarithm,
        NegativeSquareRoot,
    }

    pub type MathResult = Result<f64, MathError>;

    pub fn div(x: f64, y: f64) -> MathResult {
        if y == 0.0 {
            // 이 작업은 `실패`할 것입니다. 대신 `Err`에 감싸서 실패의 이유를 반환합니다
            Err(MathError::DivisionByZero)
        } else {
            // 이 작업은 유효합니다. `Ok`에 감싸서 결과를 반환합니다
            Ok(x / y)
        }
    }

    pub fn sqrt(x: f64) -> MathResult {
        if x < 0.0 {
            Err(MathError::NegativeSquareRoot)
        } else {
            Ok(x.sqrt())
        }
    }

    pub fn ln(x: f64) -> MathResult {
        if x <= 0.0 {
            Err(MathError::NonPositiveLogarithm)
        } else {
            Ok(x.ln())
        }
    }
}

// `op(x, y)` === `sqrt(ln(x / y))`
fn op(x: f64, y: f64) -> f64 {
    // 이것은 세 단계의 매치 피라미드입니다!
    match checked::div(x, y) {
        Err(why) => panic!("{:?}", why),
        Ok(ratio) => match checked::ln(ratio) {
            Err(why) => panic!("{:?}", why),
            Ok(ln) => match checked::sqrt(ln) {
                Err(why) => panic!("{:?}", why),
                Ok(sqrt) => sqrt,
            },
        },
    }
}

fn main() {
    // 이것이 실패할까요?
    println!("{}", op(1.0, 10.0));
}
```
