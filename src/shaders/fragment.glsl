export default 
` varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
uniform float uRadius;
float sdBox( in vec2 p, in vec2 b )
{
    vec2 d = abs(p)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}
void main() {
	vec2 uv = vUv;
	// uv = uv - vec2(0.5);
	// uv *= 2.0;
	// gl_FragColor = vec4(vec3(step(uRadius, length(uv))), 1.0 );
	// gl_FragColor = vec4(vec3(step(0.5, mod(vUv.x * 8.0, 2.0))), 1.0 );
	// gl_FragColor = vec4(vec3(mix(1.5, 0.0, vUv.x)), 1.0);
	// vec3 viewDirection = normalize(cameraPosition - vPosition);
	// float fresnel = 1.0 - dot(viewDirection, vNormal);

	// vec3 newValue = 1.0 - abs(vPosition);
	// gl_FragColor = vec4(vec3(step(0.999,newValue.x)), 1);

	gl_FragColor = vec4(vec3(step(uRadius, distance(uv - vec2(0.5), vec2(0.0)))), 1);
	
	// gl_FragColor = vec4(1.0);


}`