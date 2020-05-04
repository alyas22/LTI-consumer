var oauth = require('oauth-sign');
var action = 'https://lti.tools/saltire/tp';

var method = 'POST';
var timestamp = Math.round(Date.now() / 1000);

var params = {
    lti_message_type: 'basic-lti-launch-request',
    lti_version: 'LTI-1p0',
    resource_link_id: '1',
    launch_presentation_document_target: "iframe",
    oauth_consumer_key: 'jisc.ac.uk',
    oauth_consumer_secret: 'secret',

    oauth_nonce: btoa(timestamp),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: timestamp,
    oauth_version: '1.0',
};

var signature = oauth.hmacsign(method, action, params, params.oauth_consumer_secret);
  params.oauth_signature = signature;

  var form = document.querySelector("#ltiForm");
  form.action = action;
  form.method = method;
  for (var name in params) {
      var node = document.createElement("input");
      node.name = name;
      node.type = 'hidden';
      node.value = params[name];
      form.appendChild(node);
  }
    form.submit();

var node = document.querySelector("#ltiframe");
      node.src = "about:blank";
      node.sandbox="allow-scripts"

