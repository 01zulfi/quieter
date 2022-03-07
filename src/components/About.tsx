import React, { FC } from 'react';
import styled from 'styled-components/macro';
import StyledLink from './StyledLink';

const AboutWrapper = styled.article`
  margin: 2em 8em;

  @media (max-width: 680px) {
    margin: 2em 1em;
  }

  h3,
  h4 {
    text-align: start;
    text-decoration: underline;
    margin-bottom: 0.6em;
  }
`;

const Wrapper = styled.div`
  background: ${(props: any) => props.theme.base.two};
  border-radius: 5px;
  padding-top: 1em;
  padding-left: 1em;
  padding-right: 1em;
  padding-bottom: 1em;
  margin: 1em;
`;

const About: FC = function About() {
  return (
    <AboutWrapper>
      <Wrapper>
        <h3>social media for quiet folks</h3>
        <p>
          quieter is a place of calm and peace, a place you visit to escape the
          unpleasantness of other media
        </p>
      </Wrapper>
      <Wrapper>
        <h3>how to quieter?</h3>
        <h4>Box</h4>
        <p>
          Box is akin to communities or groups where you can post about specific
          topics.
        </p>
        <h4>String</h4>
        <p>
          String is akin to posts or threads where you can share any
          status/thoughts you like.
        </p>
        <h4>Knot</h4>
        <p>
          Knot is akin to replies. In quieter, you can tie a knot to a String as
          a reply.
        </p>
        <h4>Star</h4>
        <p>Star is akin to likes where you can star a String you like.</p>
      </Wrapper>
      <Wrapper>
        <h4>curious how quieter was made?</h4>
        <StyledLink size="1em" bold="650">
          <a
            href="https://www.github.com/01zulfi/quieter"
            target="_blank"
            rel="noreferrer"
          >
            view source code on github
          </a>
        </StyledLink>
      </Wrapper>
    </AboutWrapper>
  );
};

export default About;
