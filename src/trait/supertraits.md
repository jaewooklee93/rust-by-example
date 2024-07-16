## 상위 트레이트

Rust에는 "상속"이 없지만, 한 트레이트를 다른 트레이트의 상위 트레이트로 정의할 수 있습니다. 예를 들어:

```rust,editable
trait Person {
    fn name(&self) -> String;
}

// Person은 Student의 상위 트레이트입니다.
// Student를 구현하려면 Person을 구현해야 합니다.
trait Student: Person {
    fn university(&self) -> String;
}

trait Programmer {
    fn fav_language(&self) -> String;
}

// CompSciStudent(컴퓨터 과학 학생)는 Programmer와 Student의 하위 트레이트입니다.
// CompSciStudent를 구현하려면 두 상위 트레이트를 구현해야 합니다.
trait CompSciStudent: Programmer + Student {
    fn git_username(&self) -> String;
}

fn comp_sci_student_greeting(student: &dyn CompSciStudent) -> String {
    format!(
        "My name is {} and I attend {}. My favorite language is {}. My Git username is {}",
        student.name(),
        student.university(),
        student.fav_language(),
        student.git_username()
    )
}

fn main() {}
```

### 참조:

[Rust 프로그래밍 언어의 상위 트레이트 챕터][trpl_supertraits]

[trpl_supertraits]: https://doc.rust-lang.org/book/ch19-03-advanced-traits.html#using-supertraits-to-require-one-traits-functionality-within-another-trait
