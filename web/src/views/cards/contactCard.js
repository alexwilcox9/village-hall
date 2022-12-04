import React from 'react';

let prettyTel, sanitisedTel;

const ContactCard = (contact) => {

    if(contact.telephone) {
        //clean any spaces from the number
        sanitisedTel = contact.telephone.replace(/\s/g, '');
        //put in the space I want
        prettyTel = sanitisedTel.slice(0,5) + ' ' + sanitisedTel.slice(5);  
    } 

      return (
        <div className="card">
            <div className="card-body">
                <div className="media-body">
                    <h3 className="card-title">{contact.role}</h3>

                    <dl>
                        {(contact.telephone) && <span>
                            <dt>Telephone</dt>
                            <dd><a className="link" href={'tel:'+ sanitisedTel}>{prettyTel}</a></dd>
                            </span>
                        }
                        {(contact.email) && <span>
                            <dt>Email</dt>
                        <dd><a className="link" href={'mailto:'+contact.email}>{contact.email}</a></dd>
                        </span>
                        }
                    </dl>
                    
                </div>
            </div>
        </div>
      );
}
  
export default ContactCard;