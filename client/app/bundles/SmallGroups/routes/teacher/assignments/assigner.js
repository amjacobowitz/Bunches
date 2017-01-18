import React from 'react';
import { css } from 'glamor';

import TextArea from '../../../components/textarea';
import TextInput from '../../../components/text-input';
import Button from '../../../components/button';
import Heading from '../../../components/heading';

import { PRIMARY, LIGHT_PRIMARY, WHITE } from '../../../palette';

export default function Assigner({ assignment, groups }) {
  if (!assignment.id) {
    return (
     <div>
        <Heading
          heading='pick or create an assignment'
        />
      </div>
    )
  }

  return (
    <div>
      {
        groups.map((group, i) => {
          return (
            <Group
              key={ i }
              group={ group }
            />
          )
        })
      }
    </div>
  );
}

const styles = {

}
