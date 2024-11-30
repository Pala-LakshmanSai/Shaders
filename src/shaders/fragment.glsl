export default 
` varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
uniform float uRadius;
void main() {
	vec2 uv = vUv;
	uv = uv - vec2(0.5);
	uv *= 2.0;
	// gl_FragColor = vec4(vec3(step(uRadius, length(uv))), 1.0 );
	// gl_FragColor = vec4(vec3(step(0.5, mod(vUv.x * 8.0, 2.0))), 1.0 );
	
	gl_FragColor = vec4(vec3(mix(1.5, 0.0, vUv.x)), 1.0);

}`