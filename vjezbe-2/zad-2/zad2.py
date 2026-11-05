import asyncio
import time

async def dohvati_korisnike():
    await asyncio.sleep(3)
    korisnici = [
        {"ime": "Ivan", "prezime": "Horvat", "godine": 22},
        {"ime": "Ana", "prezime": "Kovac", "godine": 25},
        {"ime": "Marko", "prezime": "Babic", "godine": 30}
    ]
    print("korisnici dohvaceni")
    return korisnici

async def dohvati_proizvode():
    await asyncio.sleep(5)
    proizvodi = [
        {"naziv": "laptop", "cijena": 800},
        {"naziv": "mis", "cijena": 20},
        {"naziv": "tipkovnica", "cijena": 50}
    ]
    print("proizvodi dohvaceni")
    return proizvodi

async def main():
    rezultat = await asyncio.gather(dohvati_korisnike(), dohvati_proizvode())
    print(rezultat[0])
    print(rezultat[1])

t1 = time.perf_counter()
asyncio.run(main())
t2 = time.perf_counter()
print("vrijeme izvrsavanja:", round(t2 - t1, 2))
