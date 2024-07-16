## `?` 연산자로 Option 해체하기

`Option`을 해체하는 방법은 `match` 문을 사용하는 것이지만, `?` 연산자를 사용하는 것이 더 간편합니다. `x`가 `Option`이라면, `x?`를 평가하면 `x`가 `Some`이면 내부 값을 반환하고, `None`이면 현재 실행 중인 함수를 종료하고 `None`을 반환합니다.

```rust,editable
fn next_birthday(current_age: Option<u8>) -> Option<String> {
	// `current_age`가 `None`이면 이 함수는 `None`을 반환합니다.
	// `current_age`가 `Some`이면 내부 `u8` 값 + 1이 `next_age`에 할당됩니다.
    let next_age: u8 = current_age? + 1;
    Some(format!("다음 해에는 {}살이 될 거예요", next_age))
}
```

여러 개의 `?`를 연속으로 사용하여 코드를 더 읽기 쉽게 만들 수 있습니다.

```rust,editable
struct Person {
    job: Option<Job>,
}

#[derive(Clone, Copy)]
struct Job {
    phone_number: Option<PhoneNumber>,
}

#[derive(Clone, Copy)]
struct PhoneNumber {
    area_code: Option<u8>,
    number: u32,
}

impl Person {

    // 사람의 직장의 전화번호의 지역번호를 반환합니다. (만약 존재한다면)
    fn work_phone_area_code(&self) -> Option<u8> {
        // `?` 연산자 없이 `match` 문을 사용하면 많은 중첩된 문이 필요합니다.
        // 훨씬 더 많은 코드가 필요합니다. 직접 작성해보고 어떤 것이 더 쉬운지 확인해보세요.
        self.job?.phone_number?.area_code
    }
}

fn main() {
    let p = Person {
        job: Some(Job {
            phone_number: Some(PhoneNumber {
                area_code: Some(61),
                number: 439222222,
            }),
        }),
    };

    assert_eq!(p.work_phone_area_code(), Some(61));
}
```
