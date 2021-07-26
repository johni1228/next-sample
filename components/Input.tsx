import styled from "styled-components"
import { useState } from 'react';

export interface Props {
  defaultValue: string;
  onClose: () => {};
  onChange: (v: any) => void;
}

export default function Input({ defaultValue, onClose, onChange }: Props) {
  const [showMenu, setShowMenu] = useState(false);
  const [label, setLabel] = useState('Given value');
  const [emailLabel, setEmailLabel] = useState(false);
  return (
    <Wrapper>
      <Label>Input text</Label>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <EmailInputForm>
        <EmailLabelButton onClick={() => {setShowMenu(!showMenu);}}>{label}</EmailLabelButton>
        {
          showMenu
            && (
              <DropDownMenu>
                <MenuItem onClick={() => {setLabel('Given value'); setShowMenu(false); setEmailLabel(false);}}> Given value </MenuItem>
                <MenuItem onClick={() => {setLabel('Random email address'); setShowMenu(false); setEmailLabel(true);}}> Random email address </MenuItem>
              </DropDownMenu>
            )
        }
        <EmailInput className={emailLabel ? 'email-selected' : ''}  placeholder="random@example.com" value={defaultValue} onChange={event => onChange(event.target.value)} />
      </EmailInputForm>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100vw;
  padding: 32px 16px 32px 29px;
  margin: 2rem -5rem;
  background-color: white;
`

const Label = styled.label`
  font-family: SFProDisplay,serif;
  font-size: 16px;
  line-height: 19px;
  font-weight: bold;
  letter-spacing: 0.8px;
  color: #333;
  margin-bottom: 11.2px;
`

const CloseButton = styled.button`
  position: absolute;
  top: -25px;
  right: 25px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: white;
  border: 2px solid #ddd;
  outline: none;
  font-size: 40px;
  color: #555;
  cursor: pointer;
  &:hover {
    background: #ddd;
  }
`

const EmailInputForm = styled.div`
  display: flex;
  height: 38px;
`

const EmailLabelButton = styled.button`
  font-family: SFProDisplay,serif;
  font-size: 14px;
  color: #FFFFFF;
  background: #545B62;
  border-radius: 4px 0 0 4px;
  letter-spacing: 0.7px;
  padding: 0 11.2px;
  border: 0;
  outline: none;
  cursor: pointer;
`

const DropDownMenu = styled.div`
  position: absolute;
  top: 98px;
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  border: 1px solid #D8D8D8;
  border-radius: 4px;
  padding: 3px 0;
  min-width: 180px;
  z-index: 9;
`

const MenuItem = styled.button`
  text-align: left;
  background: #FFFFFF;
  border-radius: 4px;
  padding: 8px 24px;
  white-space: nowrap;
  border: 0;
  outline: none;
  &:hover {
    background: rgba(238, 238, 238, 0.5);
  }
`

const EmailInput = styled.input`
  flex-grow: 1;
  font-family: SFProDisplay,serif;
  font-size: 14px;
  color: #555555;
  letter-spacing: 0.7px;
  border: 1px solid #CED4DA;
  border-radius: 0 4px 4px 0;
  padding: 0 11.2px;
  outline: none;
  &:focus {
    border: 1px solid #007BFF;
    outline: 3px solid rgba(0,123,255,0.30);
  }
  &.email-selected {
    background: #E9ECEF;
  }
`
