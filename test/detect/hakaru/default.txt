## Gaussian Mixture example
import dirichlet

# num of clusters
K = 5
# num of points
N = 20

# prior probability of picking cluster K
pi  <~ dirichlet(array _ of K: 1)
# prior on mean and precision
mu  <~ plate _ of K:
         normal(0, 5e-9)
tau <~ plate _ of K:
         gamma(2, 0.05) 
# observed data
x   <~ plate _ of N:
         i <~ categorical(pi)
         normal(mu[i], tau[i])

return (x, mu). pair(array(real), array(real))
