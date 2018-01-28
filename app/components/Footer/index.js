import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from 'components/A';
import LocaleToggle from 'containers/LocaleToggle';
import Wrapper from './Wrapper';
import messages from './messages';

function Footer() {
  return (
    <Wrapper>
      <section>
        <FormattedMessage
          {...messages.authorMessage}
          values={{
            author1: <A href="https://twitter.com/fermendozao">Fernando Mendoza</A>,
            author2: <A href="https://twitter.com/ali_mucino">Alejandra Muciño</A>
          }}
        />
      </section>
    </Wrapper>
  );
}

export default Footer;
