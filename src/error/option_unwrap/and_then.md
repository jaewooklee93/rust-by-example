## 조합자: `and_then`

`map()`는 `match` 문을 간소화하는 연쇄 가능한 방법으로 설명되었습니다. 
그러나 `map()`을 `Option<T>`를 반환하는 함수에 사용하면 
`Option<Option<T>>`가 생성되어 여러 호출을 연쇄하면 혼란스러워질 수 있습니다. 바로 그때 `and_then()`이라는 또 다른 조합자가 등장합니다. 일부 언어에서는 `flatmap`라고도 합니다.

`and_then()`은 함수 입력으로 감싸진 값을 호출하고 결과를 반환합니다. `Option`이 `None`이면 대신 `None`을 반환합니다.

다음 예제에서 `cookable_v3()`는 `Option<Food>`를 결과로 생성합니다. 
`map()`을 사용하면 `Option<Option<Food>>`가 생성되어 `eat()`에 사용할 수 없는 유효하지 않은 유형이 됩니다.

```rust,editable
#![allow(dead_code)]

#[derive(Debug)] enum Food { CordonBleu, Steak, Sushi }
#[derive(Debug)] enum Day { Monday, Tuesday, Wednesday }

// Sushi를 만들 재료가 없습니다.
fn have_ingredients(food: Food) -> Option<Food> {
    match food {
        Food::Sushi => None,
        _           => Some(food),
    }
}

// 모든 요리 레시피가 있지만 Cordon Bleu은 없습니다.
fn have_recipe(food: Food) -> Option<Food> {
    match food {
        Food::CordonBleu => None,
        _                => Some(food),
    }
}

// 요리를 위해서는 레시피와 재료가 모두 필요합니다.
// `match` 문의 연쇄로 논리를 나타낼 수 있습니다:
fn cookable_v1(food: Food) -> Option<Food> {
    match have_recipe(food) {
        None       => None,
        Some(food) => have_ingredients(food),
    }
}

// 이를 `and_then()`으로 더 간결하게 작성할 수 있습니다:
fn cookable_v3(food: Food) -> Option<Food> {
    have_recipe(food).and_then(have_ingredients)
}

// 그렇지 않으면 `Option<Option<Food>>`를 `Option<Food>`로 `flatten()`해야 합니다.
fn cookable_v2(food: Food) -> Option<Food> {
    have_recipe(food).map(have_ingredients).flatten()
}

fn eat(food: Food, day: Day) {
    match cookable_v3(food) {
        Some(food) => println!("Yay! {:?}에 {:?}를 먹을 수 있습니다.", day, food),
        None       => println!("Oh no. {:?}에 먹을 수 없나요?", day),
    }
}

fn main() {
    let (cordon_bleu, steak, sushi) = (Food::CordonBleu, Food::Steak, Food::Sushi);

    eat(cordon_bleu, Day::Monday);
    eat(steak, Day::Tuesday);
    eat(sushi, Day::Wednesday);
}
```

### 참조:

[closures][closures], [`Option`][option], [`Option::and_then()`][and_then], and [`Option::flatten()`][flatten]

[closures]: ../../fn/closures.md
[option]: https://doc.rust-lang.org/std/option/enum.Option.html
[and_then]: https://doc.rust-lang.org/std/option/enum.Option.html#method.and_then
[flatten]: https://doc.rust-lang.org/std/option/enum.Option.html#method.flatten
