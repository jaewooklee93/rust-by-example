## 조합자: `map`

`match`는 `Option`을 처리하는 유효한 방법입니다. 그러나, 특히 입력만 유효한 작업을 수행할 때, `match`를 자주 사용하는 것은 지루해질 수 있습니다. 이러한 경우, [조합자][combinators]를 사용하여 제어 흐름을 모듈식으로 관리할 수 있습니다.

`Option`은 `Some -> Some` 및 `None -> None`의 간단한 매핑을 위한 내장된 메서드인 `map()`을 가지고 있습니다. 여러 `map()` 호출을 체이닝하여 더 많은 유연성을 얻을 수 있습니다.

다음 예제에서는 `process()`가 이전 함수를 모두 대체하면서도 코드가 간결해집니다.

```rust,editable
#![allow(dead_code)]

#[derive(Debug)] enum Food { Apple, Carrot, Potato }

#[derive(Debug)] struct Peeled(Food);
#[derive(Debug)] struct Chopped(Food);
#[derive(Debug)] struct Cooked(Food);

// 음식을 껍질째 벗기는 함수. 음식이 없으면 `None`을 반환합니다.
// 그렇지 않으면 껍질째 벗긴 음식을 반환합니다.
fn peel(food: Option<Food>) -> Option<Peeled> {
    match food {
        Some(food) => Some(Peeled(food)),
        None       => None,
    }
}

// 음식을 다지는 함수. 음식이 없으면 `None`을 반환합니다.
// 그렇지 않으면 다진 음식을 반환합니다.
fn chop(peeled: Option<Peeled>) -> Option<Chopped> {
    match peeled {
        Some(Peeled(food)) => Some(Chopped(food)),
        None               => None,
    }
}

// 음식을 익히는 함수. 여기서는 `match` 대신 `map()`을 사용하여 경우 처리를 보여줍니다.
fn cook(chopped: Option<Chopped>) -> Option<Cooked> {
    chopped.map(|Chopped(food)| Cooked(food))
}

// 껍질을 벗기고 다지고 익히는 함수를 순차적으로 실행하는 함수.
// `map()`의 여러 사용을 체이닝하여 코드를 간소화합니다.
fn process(food: Option<Food>) -> Option<Cooked> {
    food.map(|f| Peeled(f))
        .map(|Peeled(f)| Chopped(f))
        .map(|Chopped(f)| Cooked(f))
}

// 음식이 있는지 확인한 후 먹으세요!
fn eat(food: Option<Cooked>) {
    match food {
        Some(food) => println!("Mmm. I love {:?}", food),
        None       => println!("Oh no! It wasn't edible."),
    }
}

fn main() {
    let apple = Some(Food::Apple);
    let carrot = Some(Food::Carrot);
    let potato = None;

    let cooked_apple = cook(chop(peel(apple)));
    let cooked_carrot = cook(chop(peel(carrot)));
    // 간결하게 보이는 `process()`를 사용해 보겠습니다.
    let cooked_potato = process(potato);

    eat(cooked_apple);
    eat(cooked_carrot);
    eat(cooked_potato);
}
```

### 참조:

[클로저][closures], [`Option`][option], [`Option::map()`][map]

[combinators]: https://doc.rust-lang.org/reference/glossary.html#combinator
[closures]: ../../fn/closures.md
[option]: https://doc.rust-lang.org/std/option/enum.Option.html
[map]: https://doc.rust-lang.org/std/option/enum.Option.html#method.map
