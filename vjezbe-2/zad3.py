import asyncio
import time

baza_korisnika = [
    {'korisnicko_ime': 'mirko', 'email': 'mirko123@gmail.com'},
    {'korisnicko_ime': 'ana', 'email': 'ana@gmail.com'},
    {'korisnicko_ime': 'ivan', 'email': 'ivan@gmail.com'},
    {'korisnicko_ime': 'petar', 'email': 'petar@gmail.com'}
]

baza_lozinka = [
    {'korisnicko_ime': 'mirko', 'lozinka': 'lozinka123'},
    {'korisnicko_ime': 'ana', 'lozinka': '123'},
    {'korisnicko_ime': 'ivan', 'lozinka': '123456'},
    {'korisnicko_ime': 'petar', 'lozinka': 'petar123'}
]

async def autorizacija(korisnik_iz_baze, lozinka):
    await asyncio.sleep(2)
    for k in baza_lozinka:
        if k['korisnicko_ime'] == korisnik_iz_baze['korisnicko_ime']:
            if k['lozinka'] == lozinka:
                return f"Korisnik {korisnik_iz_baze['korisnicko_ime']}: Autorizacija uspješna."
    return f"Korisnik {korisnik_iz_baze['korisnicko_ime']}: Autorizacija neuspješna."

async def autentifikacija(korisnik):
    await asyncio.sleep(3)
    for k in baza_korisnika:
        if k['korisnicko_ime'] == korisnik['korisnicko_ime'] and k['email'] == korisnik['email']:
            rezultat = await autorizacija(k, korisnik['lozinka'])
            return rezultat
    return f"Korisnik {korisnik['korisnicko_ime']} nije pronađen."

async def main():
    t1 = time.perf_counter()
     # uspjesna autorizacija
    #korisnik = {'korisnicko_ime': 'ana', 'email': 'ana@gmail.com', 'lozinka': '123'}
     # neuspjesna autorizacija (kriva lozinka)
    #korisnik = {'korisnicko_ime': 'ana', 'email': 'ana@gmail.com', 'lozinka': '1234'}
     # korisnik nije pronaden (krivi email)
    korisnik = {'korisnicko_ime': 'ana', 'email': 'ana123@gmail.com', 'lozinka': '123'}
    rezultat = await autentifikacija(korisnik)
    print(rezultat)
    t2 = time.perf_counter()
    print("Vrijeme izvršavanja:", round(t2 - t1, 2), "sekundi.")

asyncio.run(main())
