## Trait

`Trait`는 알 수 없는 유형 `Self`에 대해 정의된 메서드의 모음입니다. `Self`는 동일한 트레이트에 선언된 다른 메서드에 액세스할 수 있습니다.

트레이트는 모든 데이터 유형에 대해 구현할 수 있습니다. 아래 예제에서는 `Animal`을 정의합니다. `Animal` 트레이트는 `Sheep` 데이터 유형에 대해 구현되어 `Animal`의 메서드를 `Sheep`과 함께 사용할 수 있게 합니다.

```rust,editable
struct Sheep { naked: bool, name: &'static str }

trait Animal {
    // 연관 함수 서명; `Self`는 구현자 유형을 가리킵니다.
    fn new(name: &'static str) -> Self;

    // 메서드 서명; 이들은 문자열을 반환합니다.
    fn name(&self) -> &'static str;
    fn noise(&self) -> &'static str;

    // 트레이트는 기본 메서드 정의를 제공할 수 있습니다.
    fn talk(&self) {
        println!("{} says {}", self.name(), self.noise());
    }
}

impl Sheep {
    fn is_naked(&self) -> bool {
        self.naked
    }

    fn shear(&mut self) {
        if self.is_naked() {
            // 구현자 메서드는 구현자의 트레이트 메서드를 사용할 수 있습니다.
            println!("{} is already naked...", self.name());
        } else {
            println!("{} gets a haircut!", self.name);

            self.naked = true;
        }
    }
}

// `Animal` 트레이트를 `Sheep`에 구현합니다.
impl Animal for Sheep {
    // `Self`는 구현자 유형입니다: `Sheep`입니다.
    fn new(name: &'static str) -> Sheep {
        Sheep { name: name, naked: false }
    }

    fn name(&self) -> &'static str {
        self.name
    }

    fn noise(&self) -> &'static str {
        if self.is_naked() {
            "baaaaah?"
        } else {
            "baaaaah!"
        }
    }
    
    // 기본 트레이트 메서드를 재정의할 수 있습니다.
    fn talk(&self) {
        // 예를 들어, 잠시 생각하는 것을 추가할 수 있습니다.
        println!("{} pauses briefly... {}", self.name, self.noise());
    }
}

fn main() {
    // 이 경우 유형 어노테이션이 필요합니다.
    let mut dolly: Sheep = Animal::new("Dolly");
    // TODO ^ 유형 어노테이션을 제거해보세요.

    dolly.talk();
    dolly.shear();
    dolly.talk();
}
```
