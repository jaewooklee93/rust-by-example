## 새로운 유형 이디엄

`newtype` 이디엄은 프로그램에 올바른 유형의 값이 제공되었는지에 대한 컴파일 시간 보장을 제공합니다.

예를 들어, 연령을 확인하는 함수는 연령을 기준으로 *반드시* `Years` 유형의 값을 받아야 합니다.

```rust, editable
struct Years(i64);

struct Days(i64);

impl Years {
    pub fn to_days(&self) -> Days {
        Days(self.0 * 365)
    }
}


impl Days {
    /// 부분 년을 잘라냅니다
    pub fn to_years(&self) -> Years {
        Years(self.0 / 365)
    }
}

fn is_adult(age: &Years) -> bool {
    age.0 >= 18
}

fn main() {
    let age = Years(25);
    let age_days = age.to_days();
    println!("성인인가요? {}", is_adult(&age));
    println!("성인인가요? {}", is_adult(&age_days.to_years()));
    // println!("성인인가요? {}", is_adult(&age_days));
}
```

마지막 출력 문을 해제하면 `Years` 유형이 제공되어야 함을 알 수 있습니다.

`newtype`의 값을 기본 유형으로 얻으려면 튜플 또는 해체 구문을 사용할 수 있습니다.
```rust, editable
struct Years(i64);

fn main() {
    let years = Years(42);
    let years_as_primitive_1: i64 = years.0; // 튜플
    let Years(years_as_primitive_2) = years; // 해체
}
```

### 참조:

[`structs`][struct]

[struct]: ../custom_types/structs.md

