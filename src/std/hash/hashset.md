## HashSet

`HashSet`을 `HashMap`과 같이 생각해보세요. 하지만 `HashSet<T>`는 키만 신경 쓰는 `HashMap`입니다. (실제로 `HashSet<T>`는 `HashMap<T, ()>`의 래퍼입니다.)

"그게 왜 필요할까요?"라고 물으실 수 있습니다. "저는 `Vec`에 키만 저장할 수 있습니다."라고 말씀하실 수 있습니다.

`HashSet`의 고유한 기능은 중복된 요소가 없다는 것을 보장하는 것입니다. 모든 집합 자료구조가 이러한 계약을 수행합니다. `HashSet`은 그 중 하나의 구현입니다. (또한 참조하세요: [`BTreeSet`][treeset])

`HashSet`에 이미 존재하는 값을 삽입하면 (즉, 새 값이 기존 값과 같고 해시 값도 같으면), 새 값이 기존 값을 대체합니다.

이것은 항상 하나의 값만 원하거나 이미 가지고 있는지 확인하고 싶을 때 유용합니다.

그러나 집합은 그 이상 할 수 있습니다.

집합은 4가지 주요 작업을 수행합니다. (다음은 모두 이터레이터를 반환합니다.)

* `union`: 두 집합의 고유한 모든 요소를 가져옵니다.

* `difference`: 첫 번째 집합에 있지만 두 번째 집합에 없는 모든 요소를 가져옵니다.

* `intersection`: 두 집합에 모두 있는 모든 요소를 가져옵니다.

* `symmetric_difference`: 한 집합 또는 다른 집합에 있지만 *두 집합 모두에 없다*는 모든 요소를 가져옵니다.

다음 예제에서 이 모든 것을 시도해보세요:

```rust,editable,ignore,mdbook-runnable
use std::collections::HashSet;

fn main() {
    let mut a: HashSet<i32> = vec![1i32, 2, 3].into_iter().collect();
    let mut b: HashSet<i32> = vec![2i32, 3, 4].into_iter().collect();

    assert!(a.insert(4));
    assert!(a.contains(&4));

    // `HashSet::insert()`는 이미 존재하는 값이 있으면 false를 반환합니다.
    assert!(b.insert(4), "Value 4 is already in set B!");
    // FIXME ^ Comment out this line

    b.insert(5);

    // 만약 자료구조의 요소 유형이 `Debug`를 구현하면,
    // 자료구조는 `Debug`를 구현합니다.
    // 일반적으로 요소를 `[elem1, elem2, ...]` 형식으로 출력합니다.
    println!("A: {:?}", a);
    println!("B: {:?}", b);

    // [1, 2, 3, 4, 5]를 임의의 순서로 출력
    println!("Union: {:?}", a.union(&b).collect::<Vec<&i32>>());

    // 이것은 [1]을 출력해야 합니다.
    println!("Difference: {:?}", a.difference(&b).collect::<Vec<&i32>>());

    // [2, 3, 4]를 임의의 순서로 출력.
    println!("Intersection: {:?}", a.intersection(&b).collect::<Vec<&i32>>());

    // 이것은 [1, 5]를 출력합니다.
    println!("Symmetric Difference: {:?}",
             a.symmetric_difference(&b).collect::<Vec<&i32>>());
}
```

(예제는 [문서에서] 가져왔습니다.)

[treeset]: https://doc.rust-lang.org/std/collections/struct.BTreeSet.html
[hash-set]: https://doc.rust-lang.org/std/collections/struct.HashSet.html#method.difference
