## HashMap

벡터는 정수 인덱스로 값을 저장하는 반면, `HashMap`은 키로 값을 저장합니다. 
`HashMap` 키는 불리언, 정수, 문자열 또는 `Eq` 및 `Hash` 트레이트를 구현하는 다른 유형일 수 있습니다. 
자세한 내용은 다음 섹션을 참조하세요.

벡터와 마찬가지로 `HashMap`은 확장 가능하지만, `HashMap`은 여분 공간이 있을 때 자신을 축소할 수도 있습니다. 
`HashMap::with_capacity(uint)`를 사용하여 특정 시작 용량의 `HashMap`을 만들 수 있거나, `HashMap::new()`를 사용하여 기본 초기 용량(권장)을 가진 `HashMap`을 얻을 수 있습니다.

```rust,editable
use std::collections::HashMap;

fn call(number: &str) -> &str {
    match number {
        "798-1364" => "전화를 완료할 수 없습니다. 다시 걸어보세요.",
        "645-7689" => "안녕하세요, 멋진 피자입니다. 제 이름은 프레드입니다. 오늘 무엇을 드릴까요?",
        _ => "안녕하세요, 누구세요?"
    }
}

fn main() { 
    let mut contacts = HashMap::new();

    contacts.insert("Daniel", "798-1364");
    contacts.insert("Ashley", "645-7689");
    contacts.insert("Katie", "435-8291");
    contacts.insert("Robert", "956-1745");

    // 참조를 가져와서 Option<&V>를 반환합니다.
    match contacts.get(&"Daniel") {
        Some(&number) => println!("Daniel에게 전화: {}", call(number)),
        _ => println!("Daniel의 번호가 없습니다."),
    }

    // `HashMap::insert()`는 새로 삽입된 값이 새로운 경우 `None`을, 그렇지 않은 경우 `Some(value)`를 반환합니다.
    contacts.insert("Daniel", "164-6743");

    match contacts.get(&"Ashley") {
        Some(&number) => println!("Ashley에게 전화: {}", call(number)),
        _ => println!("Ashley의 번호가 없습니다."),
    }

    contacts.remove(&"Ashley"); 

    // `HashMap::iter()`는 임의의 순서로 (&'a key, &'a value) 쌍을 생성하는 이터레이터를 반환합니다.
    for (contact, &number) in contacts.iter() {
        println!("{}에게 전화: {}", contact, call(number)); 
    }
}
```

해싱 및 해시맵(때로는 해시 테이블이라고도 함)이 작동하는 방식에 대한 자세한 내용은 [위키피디아 해시 테이블](https://ko.wikipedia.org/wiki/해시_테이블)을 참조하세요.

[wiki-hash]: https://ko.wikipedia.org/wiki/해시_테이블
