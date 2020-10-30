import React from "react";

import { Footer } from "../components";

export function FooterContainer() {
  return (
    <Footer>


      
      <Footer.Row>
        <Footer.Column>
          <Footer.Link href="#">🇪🇸 Barcelona</Footer.Link>
          <Footer.Link href="#">🇹🇷 Istanbul</Footer.Link>
          <Footer.Link href="#">🇫🇷 Paris</Footer.Link>
          <Footer.Link href="#">🇳🇱 Amsterdam</Footer.Link>
          <Footer.Link href="#">🇬🇧 London </Footer.Link>
        </Footer.Column>
        <Footer.Column>
          <Footer.Link href="#">🇦🇺 Sydney</Footer.Link>
          <Footer.Link href="#">🇳🇴 Oslo</Footer.Link>
          <Footer.Link href="#">🇺🇸 San Fransisco</Footer.Link>
          <Footer.Link href="#">🇹🇷 Antalya</Footer.Link>
          <Footer.Link href="#">🇨🇳 Beijing</Footer.Link>
        </Footer.Column>
        <Footer.Column>
          <Footer.Link href="#">Newly Added Places</Footer.Link>
          <Footer.Link href="#">Hidden Gems</Footer.Link>
          <Footer.Link href="#"> Backpacker Cities</Footer.Link>
          <Footer.Link href="#"> Weekend Adventure </Footer.Link>
          <Footer.Link href="#"> Stress-Free Cities</Footer.Link>
        </Footer.Column>
        <Footer.Column>
          <Footer.Link href="#">FAQ</Footer.Link>
          <Footer.Link href="#">Who we are</Footer.Link>
          <Footer.Link href="#">Affiliate Program</Footer.Link>
          <Footer.Link href="#">Terms of Use </Footer.Link>
          <Footer.Link href="#">Contact us</Footer.Link>
        </Footer.Column>

        

        {/*<Footer.Column>
          <Footer.Link href="#">Voyagers </Footer.Link>
          <Footer.Link href="#">Locals </Footer.Link>
          <Footer.Link href="#">Partners</Footer.Link>
          <Footer.Link href="#">Become a Solotripper</Footer.Link>
        </Footer.Column>*/}
        
      </Footer.Row>

      <Footer.Title/>

      <Footer.Title>
        © 2020 Made for people who ❤️ to 🚣 🏕️ 🛩️ 🏖️ and more.
      </Footer.Title>
      
    </Footer>
  );
}
