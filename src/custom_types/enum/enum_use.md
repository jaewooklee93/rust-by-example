## 사용

`use` 선언을 사용하면 수동 스코핑이 필요하지 않습니다.

```rust,editable
// 사용되지 않는 코드에 대한 경고를 숨기는 속성.
#![allow(dead_code)]

enum Stage {
    Beginner,
    Advanced,
}

enum Role {
    Student,
    Teacher,
}

fn main() {
    // 각 이름을 명시적으로 `use`하여 스코핑 없이 사용 가능하도록 합니다.
    use crate::Stage::{Beginner, Advanced};
    // `Role` 내부에서 각 이름을 자동으로 `use`합니다.
    use crate::Role::*;

    // `Stage::Beginner`과 동일합니다.
    let stage = Beginner;
    // `Role::Student`과 동일합니다.
    let role = Student;

    match stage {
        // 위에서 명시적으로 `use`한 이유로 스코핑이 필요하지 않습니다.
        Beginner => println!("초급 학습자는 학습 여정을 시작합니다!"),
        Advanced => println!("고급 학습자는 자신의 주제를 숙달하고 있습니다..."),
    }

    match role {
        // 다시 한번 스코핑이 필요하지 않습니다.
        Student => println!("학생들은 지식을 습득합니다!"),
        Teacher => println!("교사들은 지식을 전파합니다!"),
    }
}
```

### 참조:

[`match`][match] 및 [`use`][use]

[use]: ../../mod/use.md
[match]: ../../flow_control/match.md
