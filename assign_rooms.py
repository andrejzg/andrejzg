import random

PEOPLE = ["Visar", "Andrej", "Dmitrij", "Hash"]

ROOMS = [
    {"floor": 1, "size": "big",   "view": "street"},
    {"floor": 1, "size": "big",   "view": "canal"},
    {"floor": 2, "size": "small", "view": "street"},
    {"floor": 2, "size": "small", "view": "canal"},
]


def assign(people=PEOPLE, rooms=ROOMS, seed=None):
    rng = random.Random(seed)
    shuffled = people[:]
    rng.shuffle(shuffled)
    return list(zip(shuffled, rooms))


def format_assignment(assignment):
    lines = ["Room assignment:", "-" * 40]
    for person, room in assignment:
        lines.append(
            f"  {person:<8} -> floor {room['floor']}, "
            f"{room['size']} room, {room['view']}-facing"
        )
    return "\n".join(lines)


if __name__ == "__main__":
    print(format_assignment(assign()))
