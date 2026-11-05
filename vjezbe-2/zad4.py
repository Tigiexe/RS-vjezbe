import asyncio
import random
import time

async def provjeri_parnost(broj):
    await asyncio.sleep(2)
    if broj % 2 == 0:
        return f"Broj {broj} je paran."
    else:
        return f"Broj {broj} je neparan."

async def main():
    t1 = time.perf_counter()
    brojevi = [random.randint(1, 100) for i in range(10)]
    print(brojevi)
    zadaci = [asyncio.create_task(provjeri_parnost(broj)) for broj in brojevi]
    rezultati = await asyncio.gather(*zadaci)
    for r in rezultati:
        print(r)
    t2 = time.perf_counter()
    print("Vrijeme izvršavanja:", round(t2 - t1, 2), "sekundi.")

asyncio.run(main())
