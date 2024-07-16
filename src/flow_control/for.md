## for 루프

### for와 range

`for in` 구문은 `Iterator`를 반복할 수 있도록 사용할 수 있습니다.
가장 쉬운 방법 중 하나는 `range` 표현식 `a..b`를 사용하는 것입니다.
이는 `a` (포함)부터 `b` (제외)까지 1씩 증가하는 값을 생성합니다.

FizzBuzz를 `for`를 사용하여 `while` 대신 작성해 보겠습니다.

```rust,editable
fn main() {
    // `n`은 각 반복에서 1, 2, ..., 100의 값을 가집니다.
    for n in 1..101 {
        if n % 15 == 0 {
            println!("fizzbuzz");
        } else if n % 3 == 0 {
            println!("fizz");
        } else if n % 5 == 0 {
            println!("buzz");
        } else {
            println!("{}", n);
        }
    }
}
```

또는 `a..=b`를 사용하여 양쪽 끝이 모두 포함되는 범위를 사용할 수 있습니다.
위 코드는 다음과 같이 작성할 수 있습니다.

```rust,editable
fn main() {
    // `n`은 각 반복에서 1, 2, ..., 100의 값을 가집니다.
    for n in 1..=100 {
        if n % 15 == 0 {
            println!("fizzbuzz");
        } else if n % 3 == 0 {
            println!("fizz");
        } else if n % 5 == 0 {
            println!("buzz");
        } else {
            println!("{}", n);
        }
    }
}
```

### for와 Iterator

`for in` 구문은 `Iterator`와 다양한 방식으로 상호 작용할 수 있습니다.
[Iterator][iter] 트레이트 섹션에서 설명했듯이, 기본적으로 `for` 루프는 `into_iter` 함수를 컬렉션에 적용합니다.
그러나 컬렉션을 Iterator로 변환하는 방법은 이것뿐만이지 않습니다.

`into_iter`, `iter` 및 `iter_mut`는 모두 데이터 내부에 대한 다른 뷰를 제공하여 컬렉션을 Iterator로 변환하는 데 다르게 처리합니다.

* `iter` - 이 함수는 컬렉션의 각 요소를 각 반복에서 참조합니다.
  따라서 루프 후 컬렉션이 손상되지 않고 재사용 가능합니다.

```rust,editable
fn main() {
    let names = vec!["Bob", "Frank", "Ferris"];

    for name in names.iter() {
        match name {
            &"Ferris" => println!("There is a rustacean among us!"),
            // TODO ^ &를 삭제하고 "Ferris"만 매칭해 보세요
            _ => println!("Hello {}", name),
        }
    }
    
    println!("names: {:?}", names);
}
```

* `into_iter` - 이 함수는 컬렉션을 소비하여 각 반복에서 정확한 데이터를 제공합니다.
  컬렉션이 소비되면 각 반복에서 데이터가 이동되었기 때문에 루프 후 컬렉션은 재사용할 수 없습니다.

```rust,editable,ignore,mdbook-runnable
fn main() {
    let names = vec!["Bob", "Frank", "Ferris"];

    for name in names.into_iter() {
        match name {
            "Ferris" => println!("There is a rustacean among us!"),
            _ => println!("Hello {}", name),
        }
    }
    
    println!("names: {:?}", names);
    // FIXME ^ 이 줄을 주석 처리하세요
}
```

* `iter_mut` - 이 함수는 컬렉션의 각 요소에 대해 변형 가능한 참조를 제공하여 컬렉션을 변형할 수 있습니다.

```rust,editable
fn main() {
    let mut names = vec!["Bob", "Frank", "Ferris"];

    for name in names.iter_mut() {
        *name = match name {
            &mut "Ferris" => "There is a rustacean among us!",
            _ => "Hello",
        }
    }

    println!("names: {:?}", names);
}
```

위 코드에서 `match` 조건의 유형을 주의 깊게 살펴보세요. 이것은 반복 유형의 핵심 차이이며, 따라서 수행 가능한 작업이 다릅니다.

### 참조:

[Iterator][iter]

[iter]: ../trait/iter.md
